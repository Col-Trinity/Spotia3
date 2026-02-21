export enum AI_PROVIDERS {
  GEMINI = "gemini",
  CLAUDE = "claude",
  GPT = "gpt",
}

export const AI_PROVIDER = process.env.AI_PROVIDER || AI_PROVIDERS.GEMINI;

export const API_KEYS = {
  gemini: process.env.GEMINI_API_KEY,
  claude: process.env.CLAUDE_API_KEY,
  gpt: process.env.GPT_API_KEY,
};
