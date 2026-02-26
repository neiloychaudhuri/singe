import { getSupabaseServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { device_id, score, tier, username } = await req.json();

    if (!device_id || score === undefined || !tier) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sanitizedUsername = username
      ? username.trim().slice(0, 20).replace(/[^a-zA-Z0-9_.-]/g, "")
      : null;

    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("leaderboard")
      .insert({
        device_id,
        score,
        tier,
        username: sanitizedUsername || null,
      });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit score" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Leaderboard submit error:", error);
    return NextResponse.json(
      { error: "Failed to submit score" },
      { status: 500 }
    );
  }
}
