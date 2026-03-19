  import { askAI } from "@/src/lib/aiClient";
  import { NextResponse } from "next/server";
  import { AppError } from "@/src/lib/errors/appError";

  export async function POST(req: Request) {
    const data = await req.json();
    console.log(data)

    try {
      const result = await askAI({ mode: "playlist", userInput: data.userInput });
      return NextResponse.json({ result });
    } catch (error) {
      if (error instanceof AppError) {
        return NextResponse.json({ error: error.message }, { status: error.status });
      }

      return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
    }
  }
