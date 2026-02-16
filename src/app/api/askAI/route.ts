import { askAI } from "@/src/lib/aiClient";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const data = await req.json();
  
  const artistasReciente = data.artists;
  
  try {
    const result = await askAI(artistasReciente);

    return NextResponse.json({ result });
  } catch (error) {

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
