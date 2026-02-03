import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getPlaylistTracks } from "@/src/lib/spotify/play-list/tracks/route";
import { Track } from "@/src/types/track";

// type Params = {
//     params: { id: string };
// };

export async function GET(
  _req: Request,
   context: { params: { id: string } }
) {
    try {
        //  console.log(req.url , 'esto es la url ')
        const session = await getServerSession(authOptions);
        const { id } = await context.params;
        
        if (!session || !session.accessToken) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }
 
        const data = await getPlaylistTracks(session.accessToken, id);
        const tracks = data.items.map((item: Track) => item.track);
        return NextResponse.json(tracks);
    } catch (error) {
        console.error("Error playlist tracks:", error);
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
}
