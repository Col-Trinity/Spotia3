
import { db } from "./db";
import { eq } from "drizzle-orm";
import { AiResponseSchema } from "../types/ia";
import { generations, users } from "../db/schema";
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
        return await askAI({ mode: "profile", artists }) as z.infer<typeof AiResponseSchema>;
    }

    if (!generation) {
        const newGeneration = await fetchFromAI();
        if (!newGeneration) {
            throw new Error("Error al obtener generación de la IA");
        }
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
export const getUserByEmail = async (email: string, name?: string) => {
    let user = await db.query.users.findFirst({
        where: (users) => eq(users.email, email)
    });

    if (!user) {
        const result = await db.insert(users).values({
            email,
            name: name ?? email,
        }).returning();
        user = result[0];
    }
    return user.id;
}