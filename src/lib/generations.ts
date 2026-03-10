import { db } from "./db";
import { eq } from "drizzle-orm";
import { AiResponseSchema } from "../types/ia";
import { generations } from "../db/schema";
import { z } from "zod";
export const getGeneration = async (userId: string) => {
    const generation = await db.query.generations.findFirst({
        where: (generations) => eq(generations.userId, userId)
    });
    return generation;
}

export const createGeneration = async (userId: string, newGeneration: z.infer<typeof AiResponseSchema>) => {
    const generation = await db.insert(generations).values({
        userId,
        generation: newGeneration,
    });
    return generation;
};

export const updateGeneration = async (userId: string, newGeneration: z.infer<typeof AiResponseSchema>) => {
    const generation = await db.update(generations).set({
        generation: newGeneration,
    }).where(eq(generations.userId, userId));
    return generation;
};