import { DeviceCommand } from "@/lib/types"

export function getWater(): DeviceCommand {
    return {
        command: "REFILL",
        target_g: 80
    }
}