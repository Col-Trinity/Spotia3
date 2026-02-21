import { GoogleGenAI } from "@google/genai";
import { API_KEYS } from "../../../config/iaConfig";
import { BaseAIProvider } from "../BaseAIProvider";

export class GeminiProvider extends BaseAIProvider {
  readonly name = "gemini";

  async stream(prompt: string): Promise<AsyncIterable<string>> {
    const ai = new GoogleGenAI({ apiKey: API_KEYS.gemini });

    const response = await this.withRateLimitHandling(() =>
      ai.models.generateContentStream({
        model: process.env.GEMINI_MODEL!,
        contents: prompt,
      }),
    );

    async function* chunks() {
      for await (const chunk of response) {
        yield chunk.text ?? "";
      }
    }

    return chunks();
  }
}
