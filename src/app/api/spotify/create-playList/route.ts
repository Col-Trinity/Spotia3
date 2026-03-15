import { authOptions } from "@/src/lib/auth"
import { addTracksToPlaylist, createPlaylist } from "@/src/lib/spotify/play-list/route"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
export async function POST(req:Request){
      const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { accessToken, spotifyUserId } = session
  if (!accessToken || !spotifyUserId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  const { name, trackIds } = await req.json()
  const playlist = await createPlaylist(accessToken, spotifyUserId, name)
  await addTracksToPlaylist(accessToken, playlist.id, trackIds)
}