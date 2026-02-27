import { getSupabaseServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("leaderboard")
      .select("device_id, score, tier, username, created_at")
      .order("score", { ascending: false })
      .limit(200);

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch leaderboard" },
        { status: 500 }
      );
    }

    const bestByDevice = new Map<
      string,
      { device_id: string; score: number; tier: string; username: string | null; created_at: string }
    >();

    for (const row of data || []) {
      const existing = bestByDevice.get(row.device_id);
      if (!existing || row.score > existing.score) {
        bestByDevice.set(row.device_id, row);
      }
    }

    const entries = Array.from(bestByDevice.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 50)
      .map((entry, i) => ({
        rank: i + 1,
        ...entry,
      }));

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
