import { askAI } from "@/src/lib/aiClient";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await askAI();

    return NextResponse.json({ result });
  } catch (error) {

    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
