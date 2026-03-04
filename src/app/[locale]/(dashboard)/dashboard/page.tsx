"use client";

import PerfilMusicalIA from "@/src/app/_components/PerfilMusicalIA";
import Image from "next/image";
import { TopArtist } from "./data-spotify/top-artist";
import TopGenere from "@/src/app/_components/TopGenere";
import { Playlist } from "./data-spotify/play-list";
import { useState } from "react";
import TimeRangeSelector from "@/src/app/_components/TimeRangeSelector";
import { Wrapped } from "@/src/app/_components/Wrapped";
import { MusicPredictions } from "@/src/app/_components/MusicPredictions";
import spotiaLogo from "@/public/SpotIALogo.png"
import TopNavBar from "@/src/app/_components/TopNavBar";
export default function Dashboard() {

  const [timeRange, setTimeRange] = useState("short_term");
  const [iaText, setIaText] = useState<string>("");
  const [iaDate, setIaDate] = useState<{
    hygiene_level: string;
    dnd_alignment: string;
    voting_tendency: string;
  } | null>(null);

  return (
    <div className=" flex flex-col items-center justify-center">
        <Image alt="logo" src={spotiaLogo}  width={100} height={100}/>
        <TopNavBar/>
      <Playlist />
      <TopGenere />
      <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
      <TopArtist timeRange={timeRange} />

      <div>
        <h1>resouesta ia</h1>
        <PerfilMusicalIA onResult={(texto) => setIaText(texto)} onData={(data) => setIaDate(data)} />
        {iaDate && <MusicPredictions responseIa={iaDate} />
        }

      </div>
      {iaDate && <Wrapped iaText={iaText} iaDate={iaDate} />
      }
    </div>
  );
}
