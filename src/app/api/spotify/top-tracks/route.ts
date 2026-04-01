import { NextResponse } from "next/server";// para devolver respuestas HTTP
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getTopTracks } from "@/src/lib/spotify/top-tracks/route";

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
    const limite = Number(searchParams.get("limit")) || 5;
    const rangoTiempo =
      (searchParams.get("time_range") as
        | "short_term"
        | "medium_term"
        | "long_term") || "medium_term";

    const data = await getTopTracks(
      session.accessToken,
      limite,
      rangoTiempo
    );

    const items = data.items.map((track: {
      id: string;
      name: string;
      duration_ms: number;
      artists: { id: string; name: string }[];
      album: { id: string; name: string; images: { url: string; height?: number; width?: number }[] };
      external_urls: { spotify: string };
    }) => ({
      id: track.id,
      name: track.name,
      duration_ms: track.duration_ms,
      artists: track.artists.map((a) => ({ id: a.id, name: a.name })),
      album: {
        id: track.album.id,
        name: track.album.name,
        images: track.album.images,
      },
      external_urls: { spotify: track.external_urls.spotify },
    }));

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error top artists:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}