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

Respondé ÚNICAMENTE con este JSON, sin texto extra, sin markdown, sin backticks. Completá cada campo:
{
  "description": "descripción graciosa de máximo 4 oraciones, tono divertido, mencioná géneros o artistas, sin emojis, sin asteriscos, solo texto plano",
  "hygiene_level": "máximo 2 palabras, predicción graciosa del nivel de higiene",
  "dnd_alignment": "máximo 2 palabras, alineación D&D",
  "voting_tendency": "máximo 2 palabras, tendencia política argentina",
  "emotions": [
    { "name": "una palabra en español", "percentage": 50 },
    { "name": "una palabra en español", "percentage": 30 },
    { "name": "una palabra en español", "percentage": 20 }
  ]
}
Los porcentajes de emotions deben sumar exactamente 100.
`;
}