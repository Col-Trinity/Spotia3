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

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error top artists:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}