export type ResponseService<T> = {
    data: T[];
    error: string | null;
    isError: boolean;
}

class BaseService {
    constructor(private readonly baseRoute: string) {
        this.baseRoute = baseRoute;
    }

    protected async fetchApi<T>(url: string): Promise<ResponseService<T>> {
        try { 
            const res = await fetch(`${this.baseRoute}/${url}`);
            if (!res.ok) {
                return {
                    data: [],
                    isError: true,
                    error: `Error fetching ${url}: ${res.statusText}`,
                };
            }

            const data = await res.json();
            return {
                data: data.items as T[],
                isError: false,
                error: null,
            };
        } catch (error) {
            return {
                data: [],
                isError: true,
                error: error as string,
            };
        }
    }

}

export { BaseService  };