import { NextResponse } from "next/server";// para devolver respuestas HTTP
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getPlayList } from "@/src/lib/spotify/play-list/route";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("SESSION:", session);

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

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error top artists:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}