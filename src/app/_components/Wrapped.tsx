"use client";
import { useRef, useState } from "react";
import TopGenere from "./TopGenere";
import { toPng } from "html-to-image";
import { MusicPredictions } from "./MusicPredictions";
import { useTranslations } from "next-intl";

type props = {
    iaText: string;
    iaDate: { dnd_alignment: string; hygiene_level: string; voting_tendency: string; }
};

export function Wrapped({ iaText, iaDate }: props) {
    const [open, setOpen] = useState<boolean>(false)
    const t = useTranslations("wrapped");
    const tarjetaRef = useRef(null);

    const descargarImagen = async () => {
        if (!tarjetaRef.current) return;
        const imagen = await toPng(tarjetaRef.current, { skipFonts: true });
        const link = document.createElement("a");
        link.download = "mi-wrapped.png";
        link.href = imagen;
        link.click();
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="w-full py-2.5 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-400/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
                {t("show")}
            </button>

            {iaText && open && (
                <>
                    {/* Fondo semitransparente que deja ver el dashboard */}
                    <div
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                        onClick={() => setOpen(false)}
                    />

                    {/* Modal centrado */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                    <div className="w-full max-w-lg max-h-[90vh] flex flex-col bg-white border border-violet-200 rounded-2xl shadow-2xl shadow-violet-500/10 pointer-events-auto">

                        {/* Header */}
                        <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-violet-100">
                            <div>
                                <h2 className="text-sm font-bold text-gray-800">Wrapped</h2>
                                <p className="text-xs text-violet-400 mt-0.5">{t("yearInMusic")}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={descargarImagen}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-violet-200 text-violet-600 hover:bg-violet-50 hover:border-violet-400 transition-all duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                                    </svg>
                                    {t("download")}
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-violet-200 text-gray-400 hover:text-gray-700 hover:border-violet-400 transition-all duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Contenido scrolleable */}
                        <div className="flex-1 overflow-y-auto">
                            <div ref={tarjetaRef} className="flex flex-col gap-4 p-5 bg-white">

                                {/* Géneros */}
                                <div className="border border-violet-500/20 shadow-[0_0_20px_2px_rgba(139,92,246,0.08)] rounded-2xl p-4 flex justify-center">
                                    <TopGenere />
                                </div>

                                {/* Lo que dice la IA */}
                                <div className="border border-violet-500/20 shadow-[0_0_20px_2px_rgba(139,92,246,0.08)] rounded-2xl p-5">
                                    <p className="text-xs font-semibold text-gray-500 mb-2">{t("aiSays")}</p>
                                    <p className="text-sm text-gray-700 leading-relaxed">{iaText}</p>
                                </div>

                                {/* Predicciones */}
                                <div className="border border-violet-500/20 shadow-[0_0_20px_2px_rgba(139,92,246,0.08)] rounded-2xl p-5">
                                    <MusicPredictions responseIa={iaDate} />
                                </div>

                            </div>
                        </div>

                    </div>
                    </div>
                </>
            )}
        </>
    );
}
