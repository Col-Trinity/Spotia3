
import OpenAI from "openai";
import { AI_PROVIDER, API_KEYS } from "../config/iaConfig";

export async function askAI() {
  switch (AI_PROVIDER) {
    case "gemini":
      return callGemini();
    case "claude":
      return callClaude();
    case "gpt":
      return callGPT();
    default:
      throw new Error("Proveedor de IA no soportado");
  }
}
//Gpt
   async function callGPT() {
    
    const client = new OpenAI({
      apiKey: API_KEYS.gpt,
    });

    const response= await client.chat.completions.create({
      model:"gpt-4o-mini",
      messages: [{ role: "user", content: "crea una lista de cancionesficticias o reales" }],
    })
    
    return response.choices[0].message?.content ?? "";
   }
    // Gemini
    async function callGemini() {
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
                  text: `A partir de esta lista de canciones: - La Bestia Pop - De Música Ligera - Demoliendo Hoteles - Lose Yourself - Stan - Without Me - Quién se ha tomado todo el vino - Intento - The Thrill Is Gone - Mannish Boy Genera una descripción breve de la persona que escucharía esta selección. Incluye su personalidad, estilo de vida y rasgos destacados, en un tono atractivo y conciso, ideal para mostrar en una aplicación musical como Spotia.`,
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
async function callClaude(){
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
          content: "crea una lista de canciones reales o ficticias",
        },
      ],
    }),
  });
  const data = await res.json();
  return data.content[0].text;
}
