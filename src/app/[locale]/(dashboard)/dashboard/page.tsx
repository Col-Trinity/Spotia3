"use client";

import ButtonPruebaIA from "@/src/app/_components/buttonPruebaIA";
import { useSession } from "next-auth/react";
import { TopArtist } from "./data-spotify/top-artist";
import TopGenere from "@/src/app/_components/TopGenere";
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
      <TopGenere  />

      <div>
        <h1>resouesta ia</h1>
        <h4></h4>
        <ButtonPruebaIA />
      </div>
    </div>
  );
}
