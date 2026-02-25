
import OpenAI from "openai";
import { AI_PROVIDER, API_KEYS } from "../config/iaConfig";
import { Artist } from "../types/spotify";
import { buildAIPrompt } from "./helpers/buildAIPrompt";
import { NextResponse } from "next/server";

//elige un provedor 
export async function askAI({ artists }: { artists: Artist[] }) {
  switch (AI_PROVIDER) {
    case "gemini":
      return callGemini(artists);
    case "claude":
      return callClaude(artists);
    case "gpt":
      return callGPT(artists);
    default:
      throw new Error("Proveedor de IA no soportado");
  }
}
//Gpt
async function callGPT(artistas: Artist[]) {

  const client = new OpenAI({
    apiKey: API_KEYS.gpt,
  });
  const prompt = buildAIPrompt(artistas);

  const response = await client.chat.completions.create({
    model: process.env.GPT_MODEL!,
    messages: [{ role: "user", content: prompt }],
  })

  return response.choices[0].message?.content ?? "";
}
// Gemini
async function callGemini(artistas: Artist[]) {
  const prompt = buildAIPrompt(artistas);
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEYS.gemini}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GEMINI_MODEL!,
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
if (res.status === 429) {
  return NextResponse.json({ result: "La IA está ocupada, intenta más tarde." });
}
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "no se genero texto";
  try {
  return JSON.parse(text)
  } catch  {
        return { description: text, hygiene_level: "", dnd_alignment: "", voting_tendency: "" };
    
  }

}


// Claude
async function callClaude(artistas: Artist[]) {
const prompt = buildAIPrompt(artistas);
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEYS.claude}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.CLAUDE_MODEL!,
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
