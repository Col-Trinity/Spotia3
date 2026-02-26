import { Artist } from "@/src/types/spotify";

export function buildAIPrompt(artists: Artist[]) {
     const descripcionArtistas = artists.map(
    (artist) =>
      `-${artist.name} | Generos: ${artist.genres.join(",")} | Popularidad: ${artist.popularity}`
  ).join("\n")


  return `
Sos un experto en música con sentido del humor increíble.
El usuario escucha estos artistas:
${descripcionArtistas}

Respondé ÚNICAMENTE con un JSON válido con esta estructura exacta, sin texto extra, sin markdown, sin backticks:
{
  "description": "una descripción graciosa de máximo 4 oraciones, tono divertido como bio de Instagram, mencioná géneros o artistas, que suene como si conocieras al usuario de toda la vida, sin emojis, sin asteriscos, sin negritas, solo texto plano",
 "hygiene_level": "máximo 2 palabras, predicción graciosa de su nivel de higiene basada en su música",
  "dnd_alignment": "máximo 2 palabras, su alineación de D&D basada en su música",
  "voting_tendency": "máximo 2 palabras, tendencia política de argentina  basada en su música"
}
  Ejemplo output: { "hygiene_level": "Bajo", "dnd_alignment": "Chaotic Neutral", "voting_tendency": "Izquierda Unida" }.
`;
}