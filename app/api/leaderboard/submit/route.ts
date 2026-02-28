import { getSupabaseServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { device_id, score, tier, username, school } = await req.json();

    if (!device_id || score === undefined || !tier) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const sanitizedUsername = username
      ? username.trim().slice(0, 20).replace(/[^a-zA-Z0-9_.-]/g, "") || "Unknown Singe"
      : "Unknown Singe";

    const sanitizedSchool =
      typeof school === "string" && school.trim().length > 0
        ? school.trim().slice(0, 60)
        : null;

    const supabase = getSupabaseServerClient();

    // One submission per device per day — resets at 1pm EST (UTC-5) daily
    const now = new Date();
    const resetHourUTC = 18; // 1pm EST = 18:00 UTC
    const todayReset = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), resetHourUTC));
    const windowStart = now.getUTCHours() >= resetHourUTC
      ? todayReset
      : new Date(todayReset.getTime() - 24 * 60 * 60 * 1000);

    const { data: recent } = await supabase
      .from("leaderboard")
      .select("created_at")
      .eq("device_id", device_id)
      .gte("created_at", windowStart.toISOString())
      .limit(1)
      .maybeSingle();

    if (recent) {
      return NextResponse.json(
        { error: "Already submitted today. Resets at 1pm EST." },
        { status: 429 }
      );
    }

    const { error } = await supabase.from("leaderboard").insert({
      device_id,
      score,
      tier,
      username: sanitizedUsername || null,
      school: sanitizedSchool || null,
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
