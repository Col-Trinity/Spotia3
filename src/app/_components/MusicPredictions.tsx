type Props={
    responseIa:{
         dnd_alignment:string,
         hygiene_level:string,
         voting_tendency:string,}
    
    
}
export function MusicPredictions({responseIa}:Props){
    return(

          <div className="flex  gap-4 mt-6 justify-center">
            {/* Alineación D&D */}
            <div className="group relative flex flex-col items-center gap-2 px-6 py-5 rounded-3xl min-w-[130px]
              bg-gradient-to-br from-violet-600/80 to-purple-900/80
              border border-violet-400/40 shadow-[0_0_24px_4px_rgba(167,139,250,0.25)]
              hover:shadow-[0_0_36px_8px_rgba(167,139,250,0.45)] hover:scale-105 transition-all duration-300 cursor-default">
              <span className="text-3xl drop-shadow-[0_0_8px_rgba(167,139,250,0.8)]">⚔️</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300/80">Alineación</span>
              <span className="text-sm font-extrabold text-white text-center leading-tight">{responseIa.dnd_alignment}</span>
            </div>

            {/* Higiene */}
            <div className="group relative flex flex-col items-center gap-2 px-6 py-5 rounded-3xl min-w-[130px]
              bg-gradient-to-br from-cyan-500/80 to-teal-800/80
              border border-cyan-400/40 shadow-[0_0_24px_4px_rgba(34,211,238,0.25)]
              hover:shadow-[0_0_36px_8px_rgba(34,211,238,0.45)] hover:scale-105 transition-all duration-300 cursor-default">
              <span className="text-3xl drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">🧼</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300/80">Higiene</span>
              <span className="text-sm font-extrabold text-white text-center leading-tight">{responseIa.hygiene_level}</span>
            </div>

            {/* Tendencia política */}
            <div className="group relative flex flex-col items-center gap-2 px-6 py-5 rounded-3xl min-w-[130px]
              bg-gradient-to-br from-rose-500/80 to-pink-900/80
              border border-rose-400/40 shadow-[0_0_24px_4px_rgba(251,113,133,0.25)]
              hover:shadow-[0_0_36px_8px_rgba(251,113,133,0.45)] hover:scale-105 transition-all duration-300 cursor-default">
              <span className="text-3xl drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]">🗳️</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-300/80">Tendencia</span>
              <span className="text-sm font-extrabold text-white text-center leading-tight">{responseIa.voting_tendency}</span>
            </div>
          </div>

    )
}