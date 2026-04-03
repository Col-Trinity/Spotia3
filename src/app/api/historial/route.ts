import { authOptions } from "@/src/lib/auth"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { db } from "@/src/lib/db"
import { users, playlists } from "@/src/db/schema"
import { eq, desc } from "drizzle-orm"

export async function GET() {
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
  const userPlaylists = await db
  .select()
  .from(playlists)
  .where(eq(playlists.userId, user.id))
  .orderBy(desc(playlists.createdAt))

return NextResponse.json({ playlists: userPlaylists })
}