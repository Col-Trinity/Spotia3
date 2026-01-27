"use client";

import { useSession } from "next-auth/react";
import { TopArtist } from "./playList";
export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Cargando...</p>;
  if (!session) return <p>No estás logueada</p>;
  console.log(session);
  return (
    <div>
      <h1>Bienvenida {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>

      <div>
        <TopArtist />
      </div>
    </div>
  );
}
