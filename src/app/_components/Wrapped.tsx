"use client";
import { useRef, useState } from "react";
import TopGenere from "./TopGenere";
import { toPng } from "html-to-image";
import { MusicPredictions } from "./MusicPredictions";

type props = {
    iaText: string;
    iaDate:{ dnd_alignment: string; hygiene_level: string; voting_tendency: string; }
};

export function Wrapped({ iaText,iaDate }: props) {
    const [button, setButton] = useState<boolean>(false)

    const tarjetaRef = useRef(null);

    const descargarImagen = async () => {
        if (!tarjetaRef.current) return;

        const imagen = await toPng(tarjetaRef.current, {
            skipFonts: true
        });

        const link = document.createElement("a");

        link.download = "mi-wrapped.png";

        link.href = imagen;

        link.click();
    };
   return (
  <>
    <button
      onClick={() => setButton((prev) => !prev)}
      className="px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-500/30 hover:scale-105 hover:shadow-purple-400/50 active:scale-95 transition-all duration-200"
    >
      {button ? "Ocultar Wrapped" : "Mostrar Wrapped"}
    </button>

    {iaText && button && (
      <>
        <div ref={tarjetaRef} className="min-h-screen w-full md:w-[60%] max-w-2xl border border-violet-500/20 text-white px-4 py-8 md:py-10 flex flex-col items-center gap-6 md:gap-10 overflow-hidden">

          <div className="text-center w-full">
            <h1 className="text-2xl md:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-purple-400 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
              Wrapped
            </h1>
            <p className="text-[#888899] text-xs md:text-sm mt-2 tracking-wider md:tracking-widest uppercase">
              Tu año en música
            </p>
          </div>

          <div className="w-full max-w-xl rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-900/60 to-black border border-purple-500/20 shadow-2xl shadow-purple-950/50 p-2">
            <TopGenere />
          </div>

          {iaText && (
            <div className="w-full max-w-xl rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-900/70 via-fuchsia-950/60 to-black border border-purple-800/30 shadow-2xl shadow-purple-950/50 p-5 md:p-8 flex flex-col gap-4">
              <span className="text-xs font-bold tracking-widest uppercase text-purple-400">
                Lo que dice la IA de ti
              </span>
              <blockquote className="text-base md:text-xl font-semibold leading-relaxed text-white/90">
                {iaText}
              </blockquote>
            </div>
          )}

          <MusicPredictions responseIa={iaDate} />

        </div>

        <button
          onClick={descargarImagen}
          className=" px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase border-2 border-purple-500/20  hover:border-purple-500/60  hover:scale-105 active:scale-95 transition-all duration-200"
        >
          Descargar
        </button>
      </>
    )}
  </>
);
}

