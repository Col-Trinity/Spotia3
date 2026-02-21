import { AI_PROVIDER } from "../../config/iaConfig";
import { Artist } from "../../types/spotify";
import { buildAIPrompt } from "../helpers/buildAIPrompt";
import { getProvider } from "./registry";

export async function askAIStream({
  artists,
}: {
  artists: Artist[];
}): Promise<ReadableStream> {
  const prompt = buildAIPrompt(artists);
  const provider = getProvider(AI_PROVIDER);
  return provider.createStream(prompt);
}
