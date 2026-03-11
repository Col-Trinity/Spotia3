import { db } from "./db";
import { eq } from "drizzle-orm";
import { AiResponseSchema } from "../types/ia";
import { generations } from "../db/schema";
import { z } from "zod";
import { Artist } from "../types/spotify";
import { askAI } from "./aiClient";

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

export const getCachedGeneration = async (userId: string, artists: Artist[]) => {
    const generation = await getGeneration(userId);

    const fetchFromAI = async () => {
        const response = await askAI({ mode: "profile", artists });
        return AiResponseSchema.parse(response);
    }

    if (!generation) {
        const newGeneration = await fetchFromAI();
        await createGeneration(userId, newGeneration);
        return newGeneration;
    }

    const hoy = new Date().getTime()
    const updatedAt = generation.updatedAt.getTime()
    const diferencia = hoy - updatedAt
    const meses = diferencia / (1000 * 60 * 60 * 24 * 30)

    if (meses > 3) {
        const newGeneration = await fetchFromAI();
        await updateGeneration(userId, newGeneration);
        return newGeneration;
    }

    return generation.generation;
}