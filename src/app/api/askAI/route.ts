// import { askAI } from "@/src/lib/aiClient";
import { NextResponse } from "next/server";
import { AppError } from "@/src/lib/errors/appError";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { getCachedGeneration, getUserByEmail } from "@/src/lib/generations";



export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  if (!session.user.email) {
    return NextResponse.json({ error: "Email no encontrado" }, { status: 400 });
  }

  try {
    const data = await req.json();
    const userId = await getUserByEmail(session.user.email);
    const result = await getCachedGeneration(userId, data.artists);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("[askAI] Error:", error);
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
