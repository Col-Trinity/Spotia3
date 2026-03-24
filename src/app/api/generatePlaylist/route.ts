import { askAI } from "@/src/lib/aiClient";
import { NextResponse } from "next/server";
import { AppError } from "@/src/lib/errors/appError";

import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { eq, count, and, gte } from "drizzle-orm"
import { playlistAiGenerations, users, playlists, songs, playlistSongs } from "@/src/db/schema"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email!)
  })
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 400 })
  }
  const data = await req.json();

  const now = new Date()
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))

  const generationsToday = await db.select({ count: count() }).from(playlistAiGenerations).where(and(
    eq(playlistAiGenerations.userId, user.id), // que sean del usuario
    gte(playlistAiGenerations.createdAt, today) // que sean de hoy
  ))
  const total = generationsToday[0].count
  if (total >= 100) {
    return NextResponse.json({ error: "Limite diario alcazado intenta mas tarde " }, { status: 429 })
  }
  if (!data.userInput?.trim()) {
    return NextResponse.json({ error: "El campo de descripción es requerido." }, { status: 400 });
  }

  try {

    const result = await askAI({ mode: "playlist", userInput: data.userInput, options: data.options });

    // guardamos la generación para el límite diario
    await db.insert(playlistAiGenerations).values({ userId: user.id })

    // INSERT en playlists
    const [playlist] = await db.insert(playlists).values({
      userId: user.id,
      title: result.playlist.title,
      description: result.playlist.description,
    }).returning()

    // UPSERT en songs e INSERT en playlist_songs
    for (const song of result.playlist.songs) {
      // intentamos insertar, si ya existe no hace nada
      await db.insert(songs).values({
        artist: song.artist,
        title: song.title,
      }).onConflictDoNothing()

      // buscamos la canción por artist y title (exista o no)
      const savedSong = await db.query.songs.findFirst({
        where: and(
          eq(songs.artist, song.artist),
          eq(songs.title, song.title)
        )
      })

      if (!savedSong) continue // por si acaso


      // insertamos en la tabla intermedia
      await db.insert(playlistSongs).values({
        playlistId: playlist.id,
        songId: savedSong.id,
      })
    }

    return NextResponse.json({ result, playlistId: playlist.id });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const message = error instanceof Error ? error.message : String(error);
    console.error("[generatePlaylist] Error:", message);

    if (message.includes("API_KEY") || message.includes("api key") || message.includes("401") || message.includes("403")) {
      return NextResponse.json({ error: "API key de IA inválida o sin permisos. Revisá la configuración del servidor." }, { status: 500 });
    }

    if (message.includes("429")) {
      return NextResponse.json({ error: "La IA está saturada, intentá de nuevo en unos segundos." }, { status: 429 });
    }

    return NextResponse.json({ error: `Error interno: ${message}` }, { status: 500 });
  }
}
