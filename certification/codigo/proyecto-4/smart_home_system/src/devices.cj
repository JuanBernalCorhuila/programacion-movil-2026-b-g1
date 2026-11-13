package smart_home_system

import std.collection.*

enum PurifierMode { AutoMode | SleepMode | StrongMode }
enum AcMode { CoolMode | HeatMode | DryMode | FanMode }
enum FanSpeed { LowSpeed | MidSpeed | HighSpeed }
enum LightTone { WarmTone | NeutralTone | CoolTone }

func purifierModeText(m: PurifierMode): String {
    match (m) {
        case AutoMode => "Auto"
        case SleepMode => "Sleep"
        case StrongMode => "Strong"
    }
}

func acModeText(m: AcMode): String {
    match (m) {
        case CoolMode => "Cool"
        case HeatMode => "Heat"
        case DryMode => "Dry"
        case FanMode => "Fan"
    }
}

func fanSpeedText(s: FanSpeed): String {
    match (s) {
        case LowSpeed => "Low"
        case MidSpeed => "Medium"
        case HighSpeed => "High"
    }
}

func toneText(t: LightTone): String {
    match (t) {
        case WarmTone => "Warm"
        case NeutralTone => "Neutral"
        case CoolTone => "Cool"
    }
}

interface Measurable {
    func measure(): String
}

abstract class Device {
    public var id: Int64
    public var name: String
    public var location: String
    public var connected: Bool = false
    public var powered: Bool = false

    public init(id: Int64, name: String, location: String) {
        this.id = id
        this.name = name
        this.location = location
    }

    public func typeName(): String
    public func mainParams(): String

    public open func extraMenu(): ArrayList<String> {
        return ArrayList<String>()
    }

    public open func doExtra(option: Int64): Unit {
    }

    public func connText(): String {
        return if (connected) { "Connected" } else { "Disconnected" }
    }

    public func switchText(): String {
        return if (powered) { "ON" } else { "OFF" }
    }

    public func connect(): Unit {
        if (connected) {
            throw Exception("Device ${id} is already connected.")
        }
        connected = true
    }

    public func disconnect(): Unit {
        connected = false
        powered = false
    }

    public func powerOn(): Unit {
        if (!connected) {
            throw Exception("Connect the device before turning it on.")
        }
        powered = true
    }

    public func powerOff(): Unit {
        powered = false
    }

    public func requireActive(): Unit {
        if (!connected || !powered) {
            throw Exception("The device must be connected and turned on.")
        }
    }

    public func panel(): Unit {
        var running = true
        while (running) {
            clearConsole()
            println("============ Device Control Panel ============")
            println("ID: ${id} | Name: ${name} | Type: ${typeName()}")
            println("Connection: ${connText()} | Switch: ${switchText()} | Location: ${location}")
            println("Monitoring: ${mainParams()}")
            println("----------------------------------------------")
            let connLabel = if (connected) { "Disconnect" } else { "Connect" }
            let powerLabel = if (powered) { "Power off" } else { "Power on" }
            println("[1] ${connLabel}")
            println("[2] ${powerLabel}")
            let extras = extraMenu()
            var i = 0
            while (i < extras.size) {
                println("[${i + 3}] ${extras[i]}")
                i += 1
            }
            println("[0] Back")
            try {
                let choice = readInt("Select an option: ", 0, extras.size + 2)
                if (choice == 0) {
                    running = false
                } else if (choice == 1) {
                    if (connected) {
                        disconnect()
                        println("Device disconnected (and switched off).")
                    } else {
                        connect()
                        println("Device connected.")
                    }
                    pause()
                } else if (choice == 2) {
                    if (powered) {
                        powerOff()
                        println("Device switched off.")
                    } else {
                        powerOn()
                        println("Device switched on.")
                    }
                    pause()
                } else {
                    doExtra(choice - 2)
                    pause()
                }
            } catch (e: Exception) {
                println("Error: ${e.message}")
                pause()
            }
        }
    }
}

class SensorDevice <: Device & Measurable {
    public var temperature: Float64 = 24.0
    public var humidity: Float64 = 60.0
    public var step: Int64 = 0

    public init(id: Int64, name: String, location: String) {
        super(id, name, location)
    }

    public override func typeName(): String {
        return "Temp/Humidity Sensor"
    }

    public override func mainParams(): String {
        if (connected && powered) {
            return "${fmt1(temperature)} C, ${fmt1(humidity)} %"
        }
        return "No reading (offline)"
    }

    public func measure(): String {
        requireActive()
        step += 1
        temperature = 22.0 + Float64(step % 7) * 0.5
        humidity = 55.0 + Float64(step % 5) * 2.5
        return "New reading: ${fmt1(temperature)} C, ${fmt1(humidity)} %"
    }

    public override func extraMenu(): ArrayList<String> {
        let items = ArrayList<String>()
        items.add("Refresh reading")
        return items
    }

    public override func doExtra(option: Int64): Unit {
        println(measure())
    }
}

class AirPurifierDevice <: Device {
    public var mode: PurifierMode = AutoMode
    public var fanLevel: Int64 = 1
    public var pm25: Int64 = 80

    public init(id: Int64, name: String, location: String) {
        super(id, name, location)
    }

    public override func typeName(): String {
        return "Air Purifier"
    }

    public override func mainParams(): String {
        if (connected && powered) {
            return "PM2.5 ${pm25} ug/m3, mode ${purifierModeText(mode)}, fan ${fanLevel}"
        }
        return "PM2.5 ${pm25} ug/m3 (inactive)"
    }

    public override func extraMenu(): ArrayList<String> {
        let items = ArrayList<String>()
        items.add("Set mode (Auto / Sleep / Strong)")
        items.add("Set fan level (1-3)")
        items.add("Run purification cycle")
        return items
    }

    public override func doExtra(option: Int64): Unit {
        requireActive()
        if (option == 1) {
            println("[1] Auto  [2] Sleep  [3] Strong")
            let m = readInt("Mode: ", 1, 3)
            if (m == 1) {
                mode = AutoMode
            } else if (m == 2) {
                mode = SleepMode
            } else {
                mode = StrongMode
            }
            println("Mode set to ${purifierModeText(mode)}.")
        } else if (option == 2) {
            fanLevel = readInt("Fan level (1-3): ", 1, 3)
            println("Fan level set to ${fanLevel}.")
        } else {
            pm25 = pm25 - fanLevel * 15
            if (pm25 < 5) {
                pm25 = 5
            }
            println("Cycle finished. PM2.5 is now ${pm25} ug/m3.")
        }
    }
}

class BodyFatScaleDevice <: Device & Measurable {
    public var weight: Float64 = 0.0
    public var bodyFat: Float64 = 0.0
    public var battery: Int64 = 100
    public var count: Int64 = 0

    public init(id: Int64, name: String, location: String) {
        super(id, name, location)
    }

    public override func typeName(): String {
        return "Body Fat Scale"
    }

    public override func mainParams(): String {
        if (count == 0) {
            return "No measurements yet, battery ${battery} %"
        }
        return "${fmt1(weight)} kg, ${fmt1(bodyFat)} % fat, battery ${battery} %"
    }

    public func measure(): String {
        requireActive()
        if (battery < 5) {
            throw Exception("Battery too low, recharge the scale.")
        }
        count += 1
        battery -= 5
        weight = 68.0 + Float64(count % 4) * 0.4
        bodyFat = 18.0 + Float64(count % 3) * 0.5
        return "Measured: ${fmt1(weight)} kg, ${fmt1(bodyFat)} % body fat"
    }

    public override func extraMenu(): ArrayList<String> {
        let items = ArrayList<String>()
        items.add("Measure weight and body fat")
        items.add("Recharge battery")
        return items
    }

    public override func doExtra(option: Int64): Unit {
        if (option == 1) {
            println(measure())
        } else {
            battery = 100
            println("Battery recharged to 100 %.")
        }
    }
}

class AirConditionerDevice <: Device {
    public var targetTemp: Int64 = 24
    public var mode: AcMode = CoolMode
    public var speed: FanSpeed = MidSpeed

    public init(id: Int64, name: String, location: String) {
        super(id, name, location)
    }

    public override func typeName(): String {
        return "Air Conditioner"
    }

    public override func mainParams(): String {
        if (connected && powered) {
            return "${targetTemp} C, ${acModeText(mode)}, fan ${fanSpeedText(speed)}"
        }
        return "Inactive (target ${targetTemp} C)"
    }

    public override func extraMenu(): ArrayList<String> {
        let items = ArrayList<String>()
        items.add("Set target temperature (16-30)")
        items.add("Set mode (Cool / Heat / Dry / Fan)")
        items.add("Set fan speed (Low / Medium / High)")
        return items
    }

    public override func doExtra(option: Int64): Unit {
        requireActive()
        if (option == 1) {
            targetTemp = readInt("Target temperature (16-30): ", 16, 30)
            println("Target temperature set to ${targetTemp} C.")
        } else if (option == 2) {
            println("[1] Cool  [2] Heat  [3] Dry  [4] Fan")
            let m = readInt("Mode: ", 1, 4)
            if (m == 1) {
                mode = CoolMode
            } else if (m == 2) {
                mode = HeatMode
            } else if (m == 3) {
                mode = DryMode
            } else {
                mode = FanMode
            }
            println("Mode set to ${acModeText(mode)}.")
        } else {
            println("[1] Low  [2] Medium  [3] High")
            let s = readInt("Fan speed: ", 1, 3)
            if (s == 1) {
                speed = LowSpeed
            } else if (s == 2) {
                speed = MidSpeed
            } else {
                speed = HighSpeed
            }
            println("Fan speed set to ${fanSpeedText(speed)}.")
        }
    }
}

class CurtainDevice <: Device {
    public var openPercent: Int64 = 0

    public init(id: Int64, name: String, location: String) {
        super(id, name, location)
    }

    public override func typeName(): String {
        return "Curtain"
    }

    public override func mainParams(): String {
        return "Opening ${openPercent} %"
    }

    public override func extraMenu(): ArrayList<String> {
        let items = ArrayList<String>()
        items.add("Open fully")
        items.add("Close fully")
        items.add("Set opening (0-100 %)")
        return items
    }

    public override func doExtra(option: Int64): Unit {
        requireActive()
        if (option == 1) {
            openPercent = 100
        } else if (option == 2) {
            openPercent = 0
        } else {
            openPercent = readInt("Opening (0-100): ", 0, 100)
        }
        println("Curtain opening is now ${openPercent} %.")
    }
}

class LightDevice <: Device {
    public var brightness: Int64 = 50
    public var tone: LightTone = WarmTone

    public init(id: Int64, name: String, location: String) {
        super(id, name, location)
    }

    public override func typeName(): String {
        return "Lighting"
    }

    public override func mainParams(): String {
        if (connected && powered) {
            return "Brightness ${brightness} %, ${toneText(tone)} light"
        }
        return "Inactive (brightness ${brightness} %)"
    }

    public override func extraMenu(): ArrayList<String> {
        let items = ArrayList<String>()
        items.add("Set brightness (0-100)")
        items.add("Set color tone (Warm / Neutral / Cool)")
        return items
    }

    public override func doExtra(option: Int64): Unit {
        requireActive()
        if (option == 1) {
            brightness = readInt("Brightness (0-100): ", 0, 100)
            println("Brightness set to ${brightness} %.")
        } else {
            println("[1] Warm  [2] Neutral  [3] Cool")
            let t = readInt("Tone: ", 1, 3)
            if (t == 1) {
                tone = WarmTone
            } else if (t == 2) {
                tone = NeutralTone
            } else {
                tone = CoolTone
            }
            println("Tone set to ${toneText(tone)}.")
        }
    }
}