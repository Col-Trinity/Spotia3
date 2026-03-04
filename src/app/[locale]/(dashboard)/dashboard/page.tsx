"use client";

import PerfilMusicalIA from "@/src/app/_components/PerfilMusicalIA";

import { TopArtist } from "./data-spotify/top-artist";
import TopGenere from "@/src/app/_components/TopGenere";
import { Playlist } from "./data-spotify/play-list";
import { useState } from "react";
import TimeRangeSelector from "@/src/app/_components/TimeRangeSelector";
import { Wrapped } from "@/src/app/_components/Wrapped";
import { MusicPredictions } from "@/src/app/_components/MusicPredictions";

export default function Dashboard() {

  const [timeRange, setTimeRange] = useState("short_term");
  const [iaText, setIaText] = useState<string>("");
  const [iaDate, setIaDate] = useState<{
    hygiene_level: string;
    dnd_alignment: string;
    voting_tendency: string;
  } | null>(null);

  return (
    <div>
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
