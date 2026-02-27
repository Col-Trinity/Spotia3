import OpenAI from "openai";
import { API_KEYS } from "../config/iaConfig";

//gemini
 export  const GeminiClient= new OpenAI({
    apiKey: API_KEYS.gemini,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  })
//gemini
