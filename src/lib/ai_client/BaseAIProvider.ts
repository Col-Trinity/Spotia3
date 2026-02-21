export class RateLimitError extends Error {
  constructor(cause?: unknown) {
    super("429", { cause }); // route.ts checks message === "429"
  }
}

export abstract class BaseAIProvider {
  abstract readonly name: string;

  abstract stream(prompt: string): Promise<AsyncIterable<string>>;

  async createStream(prompt: string): Promise<ReadableStream> {
    const iterable = await this.stream(prompt);
    return new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const text of iterable) {
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });
  }

  protected async withRateLimitHandling<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (err: unknown) {
      if (this.isRateLimitError(err)) throw new RateLimitError(err);
      throw err;
    }
  }

  private isRateLimitError(err: unknown): boolean {
    const e = err as Record<string, unknown>;
    if (e?.status === 429 || e?.code === 429) return true;
    const nested = e?.error as Record<string, unknown> | undefined;
    if (nested?.code === 429) return true;
    return false;
  }
}
