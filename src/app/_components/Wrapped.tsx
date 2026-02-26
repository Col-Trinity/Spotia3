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
    return (<>
        <button
            onClick={() => setButton((prev) => !prev)}
            className="px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase bg-linear-to-r from-green-400 to-teal-500 text-black shadow-lg shadow-green-500/30 hover:scale-105 hover:shadow-green-400/50 active:scale-95 transition-all duration-200"
        >
            {button ? "Ocultar Wrapped" : "Mostrar Wrapped"}
        </button>
        {iaText && button && (
            <>
                <div ref={tarjetaRef} className="min-h-screen  w-[60%] bg-black text-white px-4 py-10 flex flex-col items-center gap-10">
                    <div className="text-center">
                        <h1 className="text-5xl font-black tracking-tight uppercase bg-linear-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
                            Wrapped
                        </h1>
                        <p className="text-gray-400 text-sm mt-2 tracking-widest uppercase">
                            Tu año en música
                        </p>
                    </div>

                    <div className="w-full max-w-xl rounded-3xl bg-linear-to-br from-green-900/60 to-black border border-green-900/40 shadow-2xl shadow-green-950/50 p-2">
                        <TopGenere />
                    </div>

                    {iaText && (
                        <div className="w-full max-w-xl rounded-3xl bg-linear-to-br from-purple-900/70 via-fuchsia-950/60 to-black border border-purple-800/30 shadow-2xl shadow-purple-950/50 p-8 flex flex-col gap-4">
                            <span className="text-xs font-bold tracking-widest uppercase text-purple-400">
                                Lo que dice la IA de ti
                            </span>
                            <blockquote className="text-xl font-semibold leading-relaxed text-white/90">
                                {iaText}
                            </blockquote>
                        </div>
                    )}
                      <MusicPredictions responseIa={iaDate}/>
                </div>
                <button onClick={descargarImagen} className="bg-black px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase border-2 border-white/20 text-white/80 hover:border-white/60 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200">
                    Descargar
                </button>
            </>
        )}
    </>
    );
}
