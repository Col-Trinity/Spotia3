
import OpenAI from "openai";
import { AI_PROVIDER, AI_PROVIDERS, API_KEYS } from "../../config/iaConfig";
import { Artist } from "../../types/spotify";
import { buildAIPrompt } from "../helpers/buildAIPrompt";

import { GoogleGenAI } from '@google/genai';

//elige un provedor 
export async function askAI({ artists }: { artists: Artist[] }) {
  const prompt = buildAIPrompt(artists);

  switch (AI_PROVIDER) {
    case AI_PROVIDERS.GEMINI:
      return callGemini(prompt);
    case AI_PROVIDERS.CLAUDE:
      return callClaude(prompt);
    case AI_PROVIDERS.GPT:
      return callGPT(prompt);
    default:
      throw new Error("Proveedor de IA no soportado");
  }
}
//Gpt
async function callGPT(prompt: string) {
  const client = new OpenAI({
    apiKey: API_KEYS.gpt,
  });

  const response = await client.chat.completions.create({
    model: process.env.GPT_MODEL!,
    messages: [{ role: "user", content: prompt }],
  })

  return response.choices[0].message?.content ?? "";
}
// Gemini
async function callGemini(prompt: string): Promise<string> {
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
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}
// Claude
async function callClaude(prompt: string) {
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

// Gemini stream
export async function callGeminiStream({ artists }: { artists: Artist[] }): Promise<ReadableStream> {
  const prompt = buildAIPrompt(artists);

  const ai = new GoogleGenAI({
    apiKey: API_KEYS.gemini,
  });

  let response;
  try { 
    response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
  } catch (err) {
    const is429 =
      (err as { code?: number })?.code === 429 ||
      (err as { status?: number })?.status === 429 ||
      (err as { error?: { code?: number } })?.error?.code === 429;

    if (is429) {
      throw new Error("429", { cause: err });
    } else {
      throw new Error(String((err as Error)?.message ?? err), { cause: err });
    }
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      try {
        for await (const chunk of response) {
          const text = chunk.text ?? '';
      
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }
      } catch (err) {
        throw new Error(err as string);
      } finally {
        controller.close();
      }
    },
  });

  return stream;
}
