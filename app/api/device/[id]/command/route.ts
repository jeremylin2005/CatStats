import { NextResponse, NextRequest } from "next/server"
import { DeviceCommand } from "@/lib/types"
import { getFood } from "@/lib/feeding"
import { getWater } from "@/lib/refill"

// export async function GET(req: NextRequest, { params }: { params: { id: string }}){
//     const deviceID = params.id
//     // let command: DeviceCommand

//     // if(deviceID == "FOOD"){
//     //     command = await getFood(deviceID)
//     // } else if(deviceID == "WATER"){
//     //     command = await getWater(deviceID)
//     // } else {
//     //     command = {
//     //         command: "ERROR",
//     //         reason: "UNKNOWN_DEVICE_ID"
//     //     }
//     // }

//     // return NextResponse.json(command)
//     return Response.json({ id: deviceID })
// }   

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  return Response.json({ id })
}