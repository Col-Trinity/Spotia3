import { z } from "zod";
export const AiResponseSchema = z.object({
  description: z.string(),
  hygiene_level: z.string(),
  dnd_alignment: z.string(),
  voting_tendency: z.string(),
  emotions: z.array(z.object({
    name: z.string(),
    percentage: z.number()
  }))

})