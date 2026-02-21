import { askAIStream } from "@/src/lib/ai_client/aiClient";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const stream = await askAIStream({ artists: data.artists });

    // const result = await askAI({ artists: data.artists });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {

    if ((error as Error).message === "429") {
      return new Response(
        JSON.stringify({ error: "Límite de solicitudes alcanzado. Intenta de nuevo en unos minutos." }),
        { status: 429, headers: { 'Content-Type': 'application/json' } },
      );
    }

    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
