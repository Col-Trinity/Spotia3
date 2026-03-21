import { askAI } from "@/src/lib/aiClient";
import { NextResponse } from "next/server";
import { AppError } from "@/src/lib/errors/appError";

import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { playlistAiGenerations, users } from "@/src/db/schema"
import { eq, count, and, gte } from "drizzle-orm"

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
  if (total >= 10) {
    return NextResponse.json({ error: "Limite diario alcazado intenta mas tarde " }, { status: 429 })
  }
  if (!data.userInput?.trim()) {
    return NextResponse.json({ error: "El campo de descripción es requerido." }, { status: 400 });
  }

  try {
    const result = await askAI({ mode: "playlist", userInput: data.userInput, options: data.options });
    await db.insert(playlistAiGenerations).values({ userId: user.id })
    return NextResponse.json({ result });
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
