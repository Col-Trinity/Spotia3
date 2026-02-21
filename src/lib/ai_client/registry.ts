import { AI_PROVIDERS } from "../../config/iaConfig";
import { BaseAIProvider } from "./BaseAIProvider";
import { ClaudeProvider } from "./providers/ClaudeProvider";
import { GeminiProvider } from "./providers/GeminiProvider";
import { GPTProvider } from "./providers/GPTProvider";

const providers: Record<string, BaseAIProvider> = {
  [AI_PROVIDERS.GEMINI]: new GeminiProvider(),
  [AI_PROVIDERS.CLAUDE]: new ClaudeProvider(),
  [AI_PROVIDERS.GPT]: new GPTProvider(),
};

export function getProvider(key: string): BaseAIProvider {
  const provider = providers[key];
  if (!provider) throw new Error(`Proveedor de IA no soportado: ${key}`);
  return provider;
}
