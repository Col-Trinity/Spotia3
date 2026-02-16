
import OpenAI from "openai";
import { AI_PROVIDER, API_KEYS } from "../config/iaConfig";
import { Artist } from "../types/spotify";

//elige un provedor 
export async function askAI(artistasReciente: Artist[]) {
  switch (AI_PROVIDER) {
    case "gemini":
      return callGemini(artistasReciente);
    case "claude":
      return callClaude(artistasReciente);
    case "gpt":
      return callGPT(artistasReciente);
    default:
      throw new Error("Proveedor de IA no soportado");
  }
}
//Gpt
async function callGPT(artistas: Artist[]) {

  const client = new OpenAI({
    apiKey: API_KEYS.gpt,
  });
  const descripcionArtistas = artistas.map(
    (artist) =>
      `-${artist.name} | Generos: ${artist.genres.join(",")} | Popularidad: ${artist.popularity}`
  ).join("\n")

  const prompt = `
Estos son los artistas escuchados recientemente por el usuario:

${descripcionArtistas}

Genera una descripción breve del perfil musical del usuario.
Debe sonar atractiva, modernay graciosa.
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  })

  return response.choices[0].message?.content ?? "";
}
// Gemini
async function callGemini(artistas: Artist[]) {
  const descripcionArtistas = artistas.map(
    (artist) =>
      `-${artist.name} | Generos: ${artist.genres.join(",")} | Popularidad: ${artist.popularity}`
  ).join("\n")

  const prompt = `
Estos son los artistas escuchados recientemente por el usuario:

${descripcionArtistas}

Genera una descripción breve del perfil musical del usuario.
Debe sonar atractiva, modernay graciosa.
`;
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEYS.gemini}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    },
  );

  const data = await res.json();
  console.log("Respuesta de Gemini:", data);
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

}


// Claude
async function callClaude(artistas: Artist[]) {
  const descripcionArtistas = artistas.map(
    (artist) =>
      `-${artist.name} | Generos: ${artist.genres.join(",")} | Popularidad: ${artist.popularity}`
  ).join("\n")

  const prompt = `
Estos son los artistas escuchados recientemente por el usuario:

${descripcionArtistas}

Genera una descripción breve del perfil musical del usuario.
Debe sonar atractiva, modernay graciosa.
`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEYS.claude}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-3-opus-20240229",
      messages: [
        {
          role: "user",
          content: prompt
        },
      ],
    }),
  });
  const data = await res.json();
  return data.content[0].text;
}
