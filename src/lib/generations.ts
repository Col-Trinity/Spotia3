import { supabase } from "../lib/supabase";
import { AiResponseSchema } from "../types/ia";
import { z } from "zod";
import { Artist } from "../types/spotify";
import { askAI } from "./aiClient";

export const getGeneration = async (userId: string) => {
    const { data, error } = await supabase
        .from('generations')
        .select('*')
        .eq('user_id', userId)
        .single();

    if (error) {
        console.error('Error fetching generation:', error);
        return null;
    }
    return data;
}

export const createGeneration = async (userId: string, newGeneration: z.infer<typeof AiResponseSchema>) => {
    const { data, error } = await supabase
        .from('generations')
        .insert({
            user_id: userId,
            generation: newGeneration,
        })
        .select()
        .single();

    if (error) {
        console.error('Error creating generation:', error);
        throw error;
    }
    return data;
};

export const updateGeneration = async (userId: string, newGeneration: z.infer<typeof AiResponseSchema>) => {
    const { data, error } = await supabase
        .from('generations')
        .update({
            generation: newGeneration,
        })
        .eq('user_id', userId)
        .select()
        .single();

    if (error) {
        console.error('Error updating generation:', error);
        throw error;
    }
    return data;
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
    const updatedAt = new Date(generation.updated_at).getTime()
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
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

    let user = data;

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user:', error);
        throw error;
    }

    if (!user) {
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert({
                email,
                name: name ?? email,
            })
            .select()
            .single();

        if (insertError) {
            console.error('Error creating user:', insertError);
            throw insertError;
        }
        user = newUser;
    }
    return user.id;
}