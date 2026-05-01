export type DeviceCommand = 
| { command: "FEED"; target_g: number}
| { command: "REFILL"; target_g: number}
| { command: "IDLE"; reason: string }
| { command: "ERROR"; reason: string}