import { NextResponse } from "next/server";// para devolver respuestas HTTP
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getPlayList } from "@/src/lib/spotify/play-list/route";
import { PlaylistItem } from "@/src/types/playList";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
      

        if (!session || !session.accessToken) {
            return NextResponse.json(
                { error: "No autorizado" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const limite = Number(searchParams.get("limit")) || 10;

        const data = await getPlayList(
            session.accessToken,
            limite
        );
        const playlists = data.items.map((p: PlaylistItem) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            url: p.external_urls.spotify,
            tracksTotal: p.tracks.total,
        }));


        return NextResponse.json(playlists);
    } catch (error) {
        console.error("Error top artists:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}