"use client";
import { useRef, useState } from "react";
import TopGenere from "./TopGenere";
import { toPng } from "html-to-image";
import { MusicPredictions } from "./MusicPredictions";
import { useTranslations } from "next-intl";

type props = {
  iaText: string;
  iaDate: {
    dnd_alignment: string;
    hygiene_level: string;
    voting_tendency: string;
  };
};

export function Wrapped({ iaText, iaDate }: props) {
  const [open, setOpen] = useState<boolean>(false);
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
        className="w-full py-3 rounded-2xl font-extrabold text-sm tracking-widest uppercase bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/40 hover:shadow-fuchsia-400/60 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
      >
        ✦ {t("show")} ✦
      </button>

      {iaText && open && (
        <>
          {/* Fondo oscuro con blur */}
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* Modal centrado */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="w-full max-w-lg max-h-[90vh] flex flex-col rounded-3xl shadow-2xl shadow-fuchsia-500/20 pointer-events-auto overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg, #0f0a1e 0%, #1a0a2e 50%, #0d1a2e 100%)",
              }}
            >
              {/* Header con gradiente */}
              <div
                className="flex-shrink-0 relative px-6 py-5 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #c026d3 50%, #db2777 100%)",
                }}
              >
                {/* Decoración de fondo */}
                <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-black/20 blur-xl" />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-xs font-semibold tracking-[0.2em] uppercase mb-0.5">
                      {t("yearInMusic")}
                    </p>
                    <h2 className="text-3xl font-black text-white tracking-tight">
                      Wrapped
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={descargarImagen}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-sm transition-all duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {t("download")}
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 border border-white/30 transition-all duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Contenido scrolleable */}
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-700 scrollbar-track-transparent">
                <div
                  ref={tarjetaRef}
                  className="flex flex-col gap-4 p-5"
                  style={{
                    background:
                      "linear-gradient(160deg, #0f0a1e 0%, #1a0a2e 50%, #0d1a2e 100%)",
                  }}
                >
                  {/* Banner título para la descarga */}
                  <div
                    className="relative rounded-2xl overflow-hidden px-6 py-5 text-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #7c3aed 0%, #c026d3 50%, #db2777 100%)",
                    }}
                  >
                    <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
                    <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-black/20 blur-xl" />
                    <p className="relative text-white/70 text-[10px] font-bold tracking-[0.25em] uppercase mb-1">
                      {t("yearInMusic")}
                    </p>
                    <h1 className="relative text-4xl font-black text-white tracking-tight">
                      Wrapped
                    </h1>
                  </div>

                  {/* Géneros */}
                  <div className="rounded-2xl p-4 flex justify-center border border-violet-500/20 bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                    <TopGenere />
                  </div>

                  {/* Lo que dice la IA */}
                  <div className="rounded-2xl p-5 border border-fuchsia-500/20 bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(217,70,219,0.12)]">
                    <p className="text-xs font-bold text-fuchsia-400 tracking-widest uppercase mb-3">
                      {t("aiSays")}
                    </p>
                    <p className="text-sm text-white/85 leading-relaxed">
                      {iaText}
                    </p>
                  </div>

                  {/* Predicciones */}
                  <div className="rounded-2xl p-5 border border-pink-500/20 bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.12)]">
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

