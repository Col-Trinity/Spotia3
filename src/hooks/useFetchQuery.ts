import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useFetchQuery<TData, TResult = TData>(
    key: string,
    url: string,
    options?: Omit<UseQueryOptions<TData, Error, TResult>, "queryKey" | "queryFn">


) {
    return useQuery<TData, Error, TResult>({
        queryKey: [key],
        queryFn: async () => {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Error al obtener datos: ${res.status}`);
            return res.json() as Promise<TData>;
        },
        ...options,
    });
}