export const maxDuration = 15;

import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { inputs, score, tier } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = buildPrompt(inputs, score, tier);
    const result = await model.generateContent(prompt);
    const readout = result.response.text();

    return NextResponse.json({ readout });
  } catch (error) {
    console.error("Gemini generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate readout" },
      { status: 500 }
    );
  }
}
