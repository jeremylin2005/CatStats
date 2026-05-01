import { DeviceCommand } from "@/lib/types"
import { kv } from "@vercel/kv"

export async function getWater(deviceID: string, waterGrams: number): Promise<DeviceCommand> {
    const raw = await kv.get(`${deviceID}:last_water_grams`)
    let command: DeviceCommand

    if(raw == null){
        await kv.set(`${deviceID}:last_water_grams`, waterGrams)
        return {command: "IDLE"}
    }
    
    const lastWaterGrams = Number(raw)
    
    if(waterGrams >= lastWaterGrams){
        command = {command: "IDLE"}
    } else {
        command = {command: "REFILL", target_g: (lastWaterGrams - waterGrams)}
    }

    await kv.set(`${deviceID}:last_water_grams`, waterGrams)
    return command
}