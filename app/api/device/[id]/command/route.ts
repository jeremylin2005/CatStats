import { NextResponse, NextRequest } from "next/server"
import { DeviceCommand } from "@/lib/types"
import { getFood } from "@/lib/feeding"
import { getWater } from "@/lib/refill"

export async function GET(req: NextRequest, context: { params: { id: string }}){
    const deviceID = context.params.id.toUpperCase()
    let command: DeviceCommand

    if(deviceID == "FOOD"){
        command = await getFood(deviceID)
    } else if(deviceID == "WATER"){
        command = await getWater(deviceID)
    } else {
        command = {
            command: "ERROR",
            reason: "UNKNOWN_DEVICE_ID"
        }
    }

    return NextResponse.json(command)
}   