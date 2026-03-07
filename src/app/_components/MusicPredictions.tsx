type Props={
    responseIa:{
         dnd_alignment:string,
         hygiene_level:string,
         voting_tendency:string,}


}
export function MusicPredictions({responseIa}:Props){
  return (
  <div className="flex flex-wrap gap-4 mt-6 justify-center">

    {/* Alineación D&D */}
    <div className="group relative flex flex-col items-center gap-1 px-4 py-3 sm:px-6 sm:py-5 rounded-3xl w-[45%] sm:w-auto sm:min-w-32
      bg-gradient-to-br from-purple-600/80 to-[#0A0A0F]
      border border-purple-500/40 shadow-[0_0_24px_4px_rgba(108,99,255,0.25)]
      hover:shadow-[0_0_36px_8px_rgba(108,99,255,0.45)] hover:scale-105 transition-all duration-300 cursor-default">
      <span className="text-2xl sm:text-3xl">⚔️</span>
      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-purple-300/80">Alineación</span>
      <span className="text-xs sm:text-sm font-extrabold text-white text-center leading-tight">{responseIa.dnd_alignment}</span>
    </div>

    {/* Higiene */}
    <div className="group relative flex flex-col items-center gap-1 px-4 py-3 sm:px-6 sm:py-5 rounded-3xl w-[45%] sm:w-auto sm:min-w-32
      bg-gradient-to-br from-violet-500/80 to-[#0A0A0F]
      border border-violet-500/40 shadow-[0_0_24px_4px_rgba(108,99,255,0.25)]
      hover:shadow-[0_0_36px_8px_rgba(108,99,255,0.45)] hover:scale-105 transition-all duration-300 cursor-default">
      <span className="text-2xl sm:text-3xl">🧼</span>
      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300/80">Higiene</span>
      <span className="text-xs sm:text-sm font-extrabold text-white text-center leading-tight">{responseIa.hygiene_level}</span>
    </div>

    {/* Tendencia política */}
    <div className="group relative flex flex-col items-center gap-1 px-4 py-3 sm:px-6 sm:py-5 rounded-3xl w-[45%] sm:w-auto sm:min-w-32
      bg-gradient-to-br from-fuchsia-600/80 to-[#0A0A0F]
      border border-fuchsia-500/40 shadow-[0_0_24px_4px_rgba(108,99,255,0.25)]
      hover:shadow-[0_0_36px_8px_rgba(108,99,255,0.45)] hover:scale-105 transition-all duration-300 cursor-default">
      <span className="text-2xl sm:text-3xl">🗳️</span>
      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-300/80">Tendencia</span>
      <span className="text-xs sm:text-sm font-extrabold text-white text-center leading-tight">{responseIa.voting_tendency}</span>
    </div>

  </div>
);
}
