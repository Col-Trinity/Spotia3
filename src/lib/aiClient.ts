
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { zodResponseFormat } from "openai/helpers/zod";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { AI_PROVIDER, API_KEYS } from "../config/iaConfig";
import { Artist } from "../types/spotify";
import { buildAIPrompt } from "./helpers/buildAIPrompt";
import { buildPlayListPrompt ,Options} from "./helpers/buildPlayListPromp";
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

const PlaylistResponseSchema = z.object({
  playlist: z.object({
    title: z.string(),
    description: z.string(),
    songs: z.array(z.object({
      artist: z.string(),
      title: z.string(),
    }))
  })
})

export type PlaylistResponse = z.infer<typeof PlaylistResponseSchema>;

type AskAIParams =
  | { mode: "profile"; artists: Artist[] }
  | { mode: "playlist"; userInput: string, options:Options };

//elige un provedor
export async function askAI(params: AskAIParams) {
  const prompt = params.mode === "playlist"
    ? buildPlayListPrompt({ userInput: params.userInput, options:params.options })
    : buildAIPrompt(params.artists);

  const schema = params.mode === "playlist" ? PlaylistResponseSchema : AiResponseSchema;

  switch (AI_PROVIDER) {
    case "gemini":
      return callGemini(prompt, schema);
    case "claude":
      return callClaude(prompt, schema);
    case "gpt":
      return callGPT(prompt, schema);
    default:
      throw new Error("Proveedor de IA no soportado");
  }
}

//Gpt
async function callGPT(prompt: string, schema: z.ZodTypeAny) {
  const client = new OpenAI({ apiKey: API_KEYS.gpt });
  const response = await client.chat.completions.parse({
    model: process.env.GPT_MODEL!,
    messages: [{ role: "user", content: prompt }],
    response_format: zodResponseFormat(schema, "ai_response"),
  });
  return response.choices[0].message.parsed;
}

// Gemini
async function callGemini(prompt: string, schema: z.ZodTypeAny) {
  if (!API_KEYS.gemini) {
    throw new AppError("GEMINI_API_KEY no está configurada.", 500);
  }
  const genAI = new GoogleGenerativeAI(API_KEYS.gemini);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" },
  });
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return schema.parse(JSON.parse(text));
  } catch (err: unknown) {
    if (err instanceof AppError) throw err;
    if (err instanceof Error && err.message.includes("429")) {
      throw new AppError("La IA está ocupada, intenta más tarde.", 429);
    }
    throw new Error("La respuesta de Gemini no tiene el formato esperado.");
  }
}

// Claude
async function callClaude(prompt: string, schema: z.ZodTypeAny) {
  const client = new Anthropic({ apiKey: API_KEYS.claude });
  const response = await client.messages.parse({
    model: process.env.CLAUDE_MODEL!,
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
    output_config: {
      format: zodOutputFormat(schema),
    },
  });
  return response.parsed_output;
}
