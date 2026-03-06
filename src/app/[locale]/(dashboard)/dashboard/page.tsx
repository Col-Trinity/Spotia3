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

      <div className="flex flex-col lg:flex-row gap-6 m-6 justify-center items-start">
        {/* Top Géneros */}
        <div className="w-full lg:w-150 border h-136 border-violet-500/20 shadow-[0_0_20px_2px_rgba(139,92,246,0.12)] rounded-2xl p-4 flex justify-center items-center">
          <TopGenere />
        </div>

        {/* Top Artistas */}
        <div className="w-full lg:w-150 h-136 border border-pink-500/20 shadow-[0_0_20px_2px_rgba(236,72,153,0.12)] rounded-2xl p-4 flex flex-col gap-4">
          <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
          <div className="flex-1 min-h-0">
            <TopArtist timeRange={timeRange} />
          </div>
        </div>
      </div>

      <div>
  
        <PerfilMusicalIA onResult={(texto) => setIaText(texto)} onData={(data) => setIaDate(data)} />
        {iaDate && <MusicPredictions responseIa={iaDate} />
        }

      </div>
      {iaDate && <Wrapped iaText={iaText} iaDate={iaDate} />
      }
    </div>
  );
}
