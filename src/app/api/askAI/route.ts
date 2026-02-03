import { askAI } from "@/src/lib/aiClient";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await askAI();
    console.log("Resultado de askAI:", result); 
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error en /api/askAI:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
1