import { authOptions } from "@/src/lib/auth"
import { addTracksToPlaylist, createPlaylist } from "@/src/lib/spotify/play-list/route"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { db } from "@/src/lib/db"
import { playlistGenerations, users } from "@/src/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { accessToken } = session
  let spotifyUserId = session.spotifyUserId
  if (!spotifyUserId) {
    const me = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${accessToken}` }
    }).then(r => r.json())
    spotifyUserId = me.id
  }

  if (!spotifyUserId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email!)
  })
  const userId = user?.id
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }
  try {
    const { name, trackIds, prompt, songs } = await req.json()

    const playlist = await createPlaylist(accessToken, spotifyUserId, name)

    await addTracksToPlaylist(accessToken, playlist.id, trackIds)

    await db.insert(playlistGenerations).values({
      userId,
      prompt,
      playlistName: name,
      songs,
      spotifyPlaylistId: playlist.id
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[create-playList] ERROR completo:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
