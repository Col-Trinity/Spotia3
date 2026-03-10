
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { zodResponseFormat } from "openai/helpers/zod";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { AI_PROVIDER, API_KEYS } from "../config/iaConfig";
import { Artist } from "../types/spotify";
import { buildAIPrompt } from "./helpers/buildAIPrompt";
import { AppError } from "./errors/appError";
import { z } from "zod"


const AiResponseSchema = z.object({
  description: z.string(),
  hygiene_level: z.string(),
  dnd_alignment: z.string(),
  voting_tendency: z.string(),
  emotions: z.array(z.object({
    name: z.string(),
    percentage: z.number()
  }))

})
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
  const client = new OpenAI({ apiKey: API_KEYS.gpt });
  const prompt = buildAIPrompt(artistas);
  const response = await client.chat.completions.parse({
    model: process.env.GPT_MODEL!,
    messages: [{ role: "user", content: prompt }],
    response_format: zodResponseFormat(AiResponseSchema, "ai_response"),
  });
  return response.choices[0].message.parsed;
}
// Gemini
async function callGemini(artistas: Artist[]) {
  const prompt = buildAIPrompt(artistas);
  if(API_KEYS.gemini){
  const genAI = new GoogleGenerativeAI(API_KEYS.gemini);
 const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });
   try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return AiResponseSchema.parse(JSON.parse(text));
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("429")) {
      throw new AppError("La IA está ocupada, intenta más tarde.", 429);
    }
    throw new Error("La respuesta de Gemini no tiene el formato esperado.");
  }
  }
 

 
}


// Claude
async function callClaude(artistas: Artist[]) {
  const prompt = buildAIPrompt(artistas);
  const client = new Anthropic({ apiKey: API_KEYS.claude });
  const response = await client.messages.parse({
    model: process.env.CLAUDE_MODEL!,
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
    output_config: {
      format: zodOutputFormat(AiResponseSchema),
    },
  });
  return response.parsed_output;
}
