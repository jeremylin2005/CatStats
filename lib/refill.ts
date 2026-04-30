import { DeviceCommand } from "@/lib/types"

export async function getWater(deviceID: string): Promise<DeviceCommand> {
    return {
        command: "REFILL",
        target_g: 80
    }
}