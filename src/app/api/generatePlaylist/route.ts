import { askAI } from "@/src/lib/aiClient";
import { NextResponse } from "next/server";
import { AppError } from "@/src/lib/errors/appError";

import { getServerSession } from "next-auth"
import { authOptions } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { playlistAiGenerations, users } from "@/src/db/schema"
import { eq, count, and, gte } from "drizzle-orm"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 })
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email!)
  })
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 400 })
  }
  const data = await req.json();

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const generationsToday = await db.select({ count: count() }).from(playlistAiGenerations).where(and(
    eq(playlistAiGenerations.userId, user.id), // que sean del usuario
    gte(playlistAiGenerations.createdAt, today) // que sean de hoy
  ))
  const total = generationsToday[0].count
  if (total >= 3) {
    return NextResponse.json({ error: "Limite diario alcazado intenta mas tarde " }, { status: 429 })
  }
  try {
    const result = await askAI({ mode: "playlist", userInput: data.userInput });
    await db.insert(playlistAiGenerations).values({
      userId: user.id
    })
    return NextResponse.json({ result });
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
