import { DeviceCommand } from "@/lib/types"

export function getFood(): DeviceCommand {
    return{
        command: "FEED",
        target_g: 80,
        feed_id: "123456"
    }
}