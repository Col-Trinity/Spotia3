"use client";

import PerfilMusicalIA from "@/src/app/_components/buttonPruebaIA";
import { useSession } from "next-auth/react";
import { TopArtist } from "./data-spotify/top-artist";
import TopGenere from "@/src/app/_components/TopGenere";
import { TopTracks } from "./data-spotify/top-tracks";
import { Playlist } from "./data-spotify/play-list";
import  Loading  from "@/src/app/_components/loading";
import { useState } from "react";
import TimeRangeSelector from "@/src/app/_components/TimeRangeSelector";
import LogOut from "@/src/app/_components/LogOut";


export default function Dashboard() {
  const { data: session, status } = useSession();
  const [timeRange, setTimeRange] = useState("short_term");

  if (status === "loading") return <Loading />;
  if (!session) return <p>No estás logueada</p>;
  return (
    <div>
      <div className="flex flex-col items-end">
        <h1>Bienvenida {session.user?.name}</h1>
        <p> {session.user?.email}</p>
        <LogOut />
      </div>
      <Playlist />
      <TopGenere />
      <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      <TopArtist timeRange={timeRange} />
      <TopTracks timeRange={timeRange} />
      <div>
        <h1>resouesta ia</h1>
        <h4></h4>
        <PerfilMusicalIA />
      </div>
    </div>
  );
}
