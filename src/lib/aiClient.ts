
  import { OpenAI } from "openai";
  import { AI_PROVIDER, API_KEYS } from "../config/iaConfig";
  import { Artist } from "../types/spotify";
  import { buildAIPrompt } from "./helpers/buildAIPrompt";
  import { zodResponseFormat } from "openai/helpers/zod"
  import { z } from "zod"
  import { GeminiClient } from "./clients";
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
  // Gemini
  const AiResponseSchema = z.object({
    description: z.string(),
    hygiene_level: z.string(),
    dnd_alignment: z.string(),
    voting_tendency: z.string()
  })
  export type AiResponse = z.infer<typeof AiResponseSchema>;

  async function callGemini(artistas: Artist[]) {

    const prompt = buildAIPrompt(artistas);

    const response = await GeminiClient.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: [{ role: "user", content: prompt }],
      response_format: zodResponseFormat(AiResponseSchema, "ai_response"),//{ type: "json_object" }
    });

    const text = response.choices[0].message.content ?? "";
    return AiResponseSchema.parse(JSON.parse(text));
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
