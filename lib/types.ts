export type DeviceCommand = 
| { command: "FEED"; target_g: number}
| { command: "REFILL"; target_g: number}
| { command: "IDLE" }
| { command: "ERROR"; reason: string}

export interface DashboardData {
  latestFeedGrams: number | null
  lastFeedTime: string | null
  latestWaterDrop: number | null
  lastWaterTime: string | null
}