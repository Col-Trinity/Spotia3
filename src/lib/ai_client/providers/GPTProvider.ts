import OpenAI from "openai";
import { API_KEYS } from "../../../config/iaConfig";
import { BaseAIProvider } from "../BaseAIProvider";

export class GPTProvider extends BaseAIProvider {
  readonly name = "gpt";

  async stream(prompt: string): Promise<AsyncIterable<string>> {
    const client = new OpenAI({ apiKey: API_KEYS.gpt });

    const response = await this.withRateLimitHandling(() =>
      client.chat.completions.create({
        model: process.env.GPT_MODEL!,
        messages: [{ role: "user", content: prompt }],
        stream: true,
      }),
    );

    async function* chunks() {
      for await (const chunk of response) {
        yield chunk.choices[0]?.delta?.content ?? "";
      }
    }

    return chunks();
  }
}
