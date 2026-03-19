import { authOptions } from "@/src/lib/auth";
import { fetchTrack } from "@/src/lib/spotify/serch-Track/router";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { song } = await req.json();
    const trackId = await fetchTrack(session.accessToken, song);
    return NextResponse.json({ trackId });

  } catch (error) {
    console.error("Error top artists:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}