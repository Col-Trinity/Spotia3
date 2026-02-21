import { API_KEYS } from "../../../config/iaConfig";
import { BaseAIProvider, RateLimitError } from "../BaseAIProvider";

export class ClaudeProvider extends BaseAIProvider {
  readonly name = "claude";

  async stream(prompt: string): Promise<AsyncIterable<string>> {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": API_KEYS.claude!,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.CLAUDE_MODEL!,
        max_tokens: 1024,
        stream: true,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (res.status === 429) throw new RateLimitError();

    if (!res.ok || !res.body) {
      const errorBody = await res.text();
      throw new Error(`Claude API error ${res.status}: ${errorBody}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    async function* parseSSE() {
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6);
          if (json === "[DONE]") continue;

          try {
            const event = JSON.parse(json);
            if (event.type === "content_block_delta") {
              yield event.delta?.text ?? "";
            }
          } catch {
            // skip malformed JSON lines
          }
        }
      }
    }

    return parseSSE();
  }
}
