import { authOptions } from "@/src/lib/auth"
import { addTracksToPlaylist, createPlaylist } from "@/src/lib/spotify/play-list/route"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
export async function POST(req:Request){
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

  try {
    const { name, trackIds } = await req.json()
    const playlist = await createPlaylist(accessToken, spotifyUserId, name)
    await addTracksToPlaylist(accessToken, playlist.id, trackIds)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error creando playlist:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}