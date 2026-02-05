import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getPlaylistTracks } from "@/src/lib/spotify/play-list/tracks/route";
import { Track } from "@/src/types/track";


type SpotifyTrackResponse = {
  items: { track: Track }[];
};

export async function GET(
  _req: Request,
   context: { params:  Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);
        const { id } = await context.params ;
    
        
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }
 
        const data: SpotifyTrackResponse = await getPlaylistTracks(session.accessToken, id);
        const tracks: Track[] = data.items.map((item) => item.track);
        return NextResponse.json(tracks);
    } catch (error) {
        console.error("Error playlist tracks:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
