import { authOptions } from "@/src/lib/auth"
import { addTracksToPlaylist, createPlaylist } from "@/src/lib/spotify/play-list/route"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { db } from "@/src/lib/db"
import { users, playlists, songs, playlistSongs } from "@/src/db/schema"
import { eq, and, sql } from "drizzle-orm"

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
    const { playlistId } = await req.json()

    const playList = await db.query.playlists.findFirst({
      where: and(
        eq(playlists.id, playlistId),
        eq(playlists.userId, user.id)
      )
    })

    if (!playList) {
      return NextResponse.json({ error: " Playlist no encontrada o no autorizada" }, { status: 403 })
    }

    const playlistSongsData = await db
      .select({ song: songs })
      .from(playlistSongs)
      .innerJoin(songs, eq(playlistSongs.songId, songs.id))
      .where(eq(playlistSongs.playlistId, playlistId))

    const allSongs = playlistSongsData.map(ps => ps.song)

    const withTrackId = allSongs.filter(s => s.spotifyTrackId !== null)
    const withoutTrackId = allSongs.filter(s => s.spotifyTrackId == null)

    for (const song of withoutTrackId) {
      const query = encodeURIComponent(`track:${song.title} artist:${song.artist}`)
      const res = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
        { headers: { Authorization: `Bearer ${accessToken}` } })

      const data = await res.json()
      const trackId = data.tracks?.items?.[0]?.id

      if (trackId) {
        await db.update(songs).set({ spotifyTrackId: trackId }).where(eq(songs.id, song.id))
        song.spotifyTrackId = trackId
      }

    }

    for (const song of allSongs) {
      await db.update(songs).
        set({ timesUsed: sql`${songs.timesUsed} + 1` })
        .where(eq(songs.id, song.id))
    }
    // juntamos todos los trackIds disponibles
    const trackIds = [...withTrackId, ...withoutTrackId]
      .map(s => s.spotifyTrackId)
      .filter(id => id !== null) as string[]

    // creamos la playlist en spotifi 
    const spotifyPlaylist = await createPlaylist(accessToken, spotifyUserId, playList.title)
    await addTracksToPlaylist(accessToken, spotifyPlaylist.id, trackIds)
    console.log("[create-playList] allSongs:", allSongs.length)
    return NextResponse.json({ ok: true, spotifyPlaylistId: spotifyPlaylist.id })
  } catch (error) {

    console.error("[create-playList] ERROR completo:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
