import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { DashboardData } from "@/lib/types"

export async function GET() {
  try {
    // Get last feed info
    const lastFeedGrams = Number(await kv.get("FOOD:last_feed_grams"))
    const lastFeedTime = String(await kv.get("FOOD:last_feed_id"))

    const lastWaterGrams = Number(await kv.get("WATER:last_water_grams"))
    const lastWaterTime = String(await kv.get("WATER:last_water_time"))

    const data: DashboardData = {
      latestFeedGrams: lastFeedGrams ?? null,
      lastFeedTime: lastFeedTime ?? null,
      latestWaterDrop: lastWaterGrams ?? null,
      lastWaterTime: lastWaterTime ?? null,
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    )
  }
}
