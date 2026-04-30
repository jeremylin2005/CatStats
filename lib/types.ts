export type DeviceCommand = 
| { command: "FEED"; target_g: number, feed_id: string}
| { command: "REFILL"; target_g: number}
| { command: "IDLE"; target_g: null}
| { command: "ERROR"; reason: string}