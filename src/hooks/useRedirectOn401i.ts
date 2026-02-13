"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRedirectOn401({
  isError,
  error,
}: {
  isError: boolean;
  error: unknown;
}) {
    const router = useRouter();
    useEffect(() => {
        if (!isError) return;

        const err = error as Error;
        if (err.message.includes("401")) {
            const timer = setTimeout(() => {
                router.push("/auth/login");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isError, error, router]);

}