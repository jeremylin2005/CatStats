import { DeviceCommand } from "@/lib/types"
import { kv } from "@vercel/kv"

export async function getFood(deviceID: string): Promise<DeviceCommand> {
    const now = new Date()
    const local = new Date(now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }))

    const START = 7
    const END = 22
    const MEALS = 3
    const TOTAL_G = 40

    const start = new Date(local)
    start.setHours(START, 0, 0, 0)

    const end = new Date(local);
    end.setHours(END, 0, 0, 0)

    if(local < start || local > end){
        return {command: "IDLE" }
    }

    const interval = (end.getTime() - start.getTime()) / MEALS
    const elapsed = (local.getTime() - start.getTime())

    let slot = Math.floor(elapsed / interval)
    if(slot >= MEALS){
        slot = MEALS - 1
    }

    const date = local.toISOString().split("T")[0]
    const feed_id = `${date}:${slot}`

    const last = await kv.get(`${deviceID}:last_feed_id`)

    if(last === feed_id){
        return {command: "IDLE" }
    }

    await kv.set(`${deviceID}:last_feed_id`, feed_id)
    await kv.set(`${deviceID}:last_feed_grams`, Math.floor((TOTAL_G/MEALS)))

    return {command: "FEED", target_g: (TOTAL_G/MEALS)}
}