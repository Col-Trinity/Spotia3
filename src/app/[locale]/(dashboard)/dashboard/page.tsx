"use client";

import PerfilMusicalIA from "@/src/app/_components/PerfilMusicalIA";
import { useSession } from "next-auth/react";
import { TopArtist } from "./data-spotify/top-artist";
import TopGenere from "@/src/app/_components/TopGenere";
import { TopTracks } from "./data-spotify/top-tracks";
import { Playlist } from "./data-spotify/play-list";
import Loading from "@/src/app/_components/loading";
import { useState } from "react";
import TimeRangeSelector from "@/src/app/_components/TimeRangeSelector";
import LogOut from "@/src/app/_components/LogOut";
import { redirect } from "next/navigation"
import { Wrapped } from "@/src/app/_components/Wrapped";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [timeRange, setTimeRange] = useState("short_term");
  const [iaText, setIaText] = useState<string>("");

  if (status === "loading") return <Loading />;
  if (!session) return redirect("/auth/login");
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
        <PerfilMusicalIA onResult={(texto) => setIaText(texto)} />
      </div>
      <Wrapped iaText={iaText} />
    </div>
  );
}
