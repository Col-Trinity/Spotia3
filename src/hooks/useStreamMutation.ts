// src/hooks/useStreamMutation.ts
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function useStreamMutation<TBody>(url: string) {
  const [streamedText, setStreamedText] = useState("");
  const [areMessagesPending, setAreMessagesPending] = useState(false);

  const mutation = useMutation<string, Error, TBody>({
    mutationFn: async (body: TBody) => {
      setStreamedText("");
      setAreMessagesPending(true);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setAreMessagesPending(false);
        if (res.status === 429) {
          throw new Error("Too many requests, wait a minute and try again");
        }
        throw new Error(`Error: ${res.status}`);
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";

      while (true) {
        // done it's when the stream is finished
        // value contains the chunk of the stream
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        full += chunk;
        setStreamedText(full);
      }

      setAreMessagesPending(false);

      // Stream may contain embedded errors from the AI client (e.g. "[ERROR] Api key invalid")
      if (full.startsWith("[ERROR]") || full.includes("\n[ERROR]")) {
        const msg = full.replace(/^\n?\[ERROR\]\s*/, "").trim();
        throw new Error(msg || "Error en la respuesta");
      }

      return full;
    },
  });

  return { ...mutation, streamedText, areMessagesPending };
}
