import { DeviceCommand } from "@/lib/types"
import { kv } from "@vercel/kv"

export async function getFood(deviceID: string): Promise<DeviceCommand> {
    const now = new Date()

    const START = 7
    const END = 22
    const MEALS = 3
    const TOTAL_G = 40

    const start = new Date(now)
    start.setHours(START, 0, 0, 0)

    const end = new Date(now);
    end.setHours(END, 0, 0, 0)

    if(now < start || now > end){
        return {command: "IDLE"}
    }

    const interval = (end.getTime() - start.getTime()) / MEALS
    const elapsed = (now.getTime() - start.getTime())

    let slot = Math.floor(elapsed / interval)
    if(slot >= MEALS){
        slot = MEALS - 1
    }

    const date = now.toISOString().split("T")[0]
    const event_id = `${date}:${slot}`

    const last = await kv.get(`device:${deviceID}:last_event_id`)

    if(last === event_id){
        return {command: "IDLE"}
    }

    await kv.set(`device:${deviceID}:last_event_id`, event_id)

    return {command: "FEED", target_g: (TOTAL_G/MEALS)}
}