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
            session.accessToken
        );
        const playlists = data.items.map((p: PlaylistItem & { images: { url: string }[] }) => ({
            id: p.id,
            name: p.name,
            description: p.description && p.description !== "null" ? p.description : "",
            url: p.external_urls.spotify,
            tracksTotal: p.tracks.total,
            imageUrl: p.images?.[0]?.url ?? null,
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