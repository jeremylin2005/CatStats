import { NextResponse } from "next/server"
import { kv } from "@vercel/kv"
import { DashboardData } from "@/lib/types"

export async function GET() {
  try {
    // Get last feed info
    const lastFeedGrams = await kv.get<number>("device:FOOD:last_feed_grams")
    const lastFeedTime = await kv.get<string>("device:FOOD:last_feed_time")
    const lastWaterDrop = await kv.get<number>("WATER:last_water_drop")
    const lastWaterTime = await kv.get<string>("WATER:last_water_time")

    const data: DashboardData = {
      latestFeedGrams: lastFeedGrams ?? null,
      lastFeedTime: lastFeedTime ?? null,
      latestWaterDrop: lastWaterDrop ?? null,
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
