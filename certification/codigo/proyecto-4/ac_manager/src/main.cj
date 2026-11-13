package ac_manager
// Dependencias: colecciones, conversión de números, consola y números aleatorios.
import std.collection.*
import std.convert.*
import std.env.*
import std.random.*

// Función en C (ffi/program.c) para limpiar la pantalla.
foreign func clearScreen(): Unit

// Modo del ventilador: tres niveles.
enum FanSpeed {
    | LOW
    | MIDDLE
    | HIGH

    func toString(): String {
        match (this) {
            case LOW => "Low Speed"
            case MIDDLE => "Medium Speed"
            case HIGH => "High Speed"
        }
    }
}

// Un decimal sin depender de std.format (22.46 -> "22.5").
func fmt1(x: Float64): String {
    let tenths = Int64(x * 10.0 + 0.5)
    return "${tenths / 10}.${tenths % 10}"
}

// Pausa para que el usuario alcance a leer el mensaje antes de limpiar la pantalla.
func pause(message: String) {
    println(message)
    let _ = getStdIn().readln()
}

func parseInteger(text: String): Int64 {
    var value = 0
    try {
        value = Int64.parse(text)
    } catch (e: Exception) {
        throw Exception("'${text}' is not a valid integer.")
    }
    return value
}

// ---------- Clase del dispositivo ----------
class AirConditionerDevice {
    var deviceName: String
    var isOnline: Bool = false
    var isOpened: Bool = false
    var temperature: Float64
    var humidity: Float64
    var fanSpeed: FanSpeed
    private var _deviceId: Int64
    private var _targetTemperature: Int64
    private let rng = Random()

    static prop deviceType: String {
        get() { "AIR_CONDITIONER_DEVICE" }
    }

    // El ID debe ser un entero positivo.
    mut prop deviceId: Int64 {
        get() { _deviceId }
        set(id) {
            if (id <= 0) {
                throw Exception("Device ID must be a positive integer.")
            }
            _deviceId = id
        }
    }

    // La temperatura objetivo debe estar entre 16 y 28.
    mut prop targetTemperature: Int64 {
        get() { _targetTemperature }
        set(value) {
            if (value < 16) {
                throw Exception("Temperature cannot be lower than 16°C.")
            }
            if (value > 28) {
                throw Exception("Temperature cannot be higher than 28°C.")
            }
            _targetTemperature = value
        }
    }

    init(deviceId: Int64, deviceName: String) {
        if (deviceId <= 0) {
            throw Exception("Device ID must be a positive integer.")
        }
        this._deviceId = deviceId
        this.deviceName = deviceName
        temperature = 0.0
        humidity = 0.0
        _targetTemperature = 25
        fanSpeed = FanSpeed.MIDDLE
    }

    // Solo se conecta si está encendido.
    func connect() {
        if (!isOpened) {
            return
        }
        isOnline = true
    }

    func disconnect() {
        isOnline = false
    }

    func open() {
        isOpened = true
        update()
    }

    // Al apagar se desconecta y se reinician temperatura y humedad.
    func close() {
        isOpened = false
        isOnline = false
        temperature = 0.0
        humidity = 0.0
    }

    func togglePower() {
        if (isOpened) {
            close()
        } else {
            open()
        }
    }

    // Simula datos en tiempo real.
    func update() {
        if (isOpened) {
            temperature = rng.nextGaussianFloat64(mean: 28.0, sigma: 1.0)
            humidity = rng.nextGaussianFloat64(mean: 50.0, sigma: 15.0)
            if (humidity < 0.0) {
                humidity = 0.0
            }
            if (humidity > 100.0) {
                humidity = 100.0
            }
        }
    }

    func toggleFanSpeed() {
        fanSpeed = match (fanSpeed) {
            case LOW => MIDDLE
            case MIDDLE => HIGH
            case HIGH => LOW
        }
    }

    func displayStatues() {
        update()
        println("-------- ${deviceId} ${deviceName} --------")
        println("Connection Status: ${isOnline}")
        if (isOpened) {
            println("Current State: On ${fmt1(temperature)}°C ${Int64(humidity)}%")
        } else {
            println("Current State: Off")
        }
        println("Target Temperature: ${targetTemperature}°C")
        println("Fan Speed Mode: ${fanSpeed.toString()}")
    }

    func askTemperature() {
        print("Please enter temperature (16~28): ")
        let tempStr = getStdIn().readln() ?? ""
        try {
            this.targetTemperature = parseInteger(tempStr)
        } catch (e: Exception) {
            pause("${e.message} Press Enter to continue.")
        }
    }

    // Panel de control del dispositivo.
    func operateByConsole() {
        while (true) {
            unsafe { clearScreen() }
            this.displayStatues()
            if (this.isOpened && this.isOnline) {
                // Solo un dispositivo encendido y en línea puede configurar temperatura y ventilador.
                println("Operation: [1] Disconnect [2] Power [3] Temperature [4] Fan Speed [5] Exit")
                let order = getStdIn().readln() ?? ""
                match (order) {
                    case "1" => this.disconnect()
                    case "2" => this.togglePower()
                    case "3" => this.askTemperature()
                    case "4" => this.toggleFanSpeed()
                    case "5" => break
                    case _ => pause("Command input error, please re-enter! Press Enter to continue.")
                }
            } else {
                println("Operation: [1] Connect [2] Power [3] Exit")
                let order = getStdIn().readln() ?? ""
                match (order) {
                    case "1" =>
                        if (!this.isOpened) {
                            pause("The device is off, turn it on first. Press Enter to continue.")
                        } else {
                            this.connect()
                        }
                    case "2" => this.togglePower()
                    case "3" => break
                    case _ => pause("Command input error, please re-enter! Press Enter to continue.")
                }
            }
        }
    }
}

// ---------- Administrador (singleton) ----------
class AirConditionerManager {
    public let airconditioners = ArrayList<AirConditionerDevice>()

    private init() {
        let waitingRoom = AirConditionerDevice(10001, "Waiting Room Air Conditioner")
        waitingRoom.open()
        waitingRoom.connect()
        airconditioners.add(waitingRoom)

        let consultingRoom = AirConditionerDevice(10002, "Consulting Room Air Conditioner")
        consultingRoom.open()
        consultingRoom.connect()
        airconditioners.add(consultingRoom)
    }

    private static let manager = AirConditionerManager()

    public static func getInstance(): AirConditionerManager {
        manager
    }

    // Agrega un dispositivo; no permite IDs repetidos.
    public func addAirConditioner(device: AirConditionerDevice) {
        for (d in airconditioners) {
            if (d.deviceId == device.deviceId) {
                throw Exception("A device with ID ${device.deviceId} already exists.")
            }
        }
        airconditioners.add(device)
    }

    public func removeAirConditioner(index: Int64) {
        airconditioners.remove(at: index)
    }

    // Devuelve la posición del dispositivo con ese ID, o -1 si no existe.
    public func indexOfDevice(deviceId: Int64): Int64 {
        for (i in 0..airconditioners.size) {
            if (airconditioners[i].deviceId == deviceId) {
                return i
            }
        }
        return -1
    }
}

// ---------- Lógica de la consola ----------
func listDevices(manager: AirConditionerManager) {
    for (i in 0..manager.airconditioners.size) {
        let d = manager.airconditioners[i]
        println("[${i + 1}] Device: ${d.deviceName}; ID: ${d.deviceId}")
    }
}

func configureDevice(manager: AirConditionerManager) {
    if (manager.airconditioners.size == 0) {
        pause("There are no devices. Press Enter to continue.")
        return
    }
    listDevices(manager)
    print("Please enter the number: ")
    let input = getStdIn().readln() ?? ""
    try {
        let number = parseInteger(input)
        if (number < 1 || number > manager.airconditioners.size) {
            throw Exception("Incorrect number, please try again!")
        }
        manager.airconditioners[number - 1].operateByConsole()
    } catch (e: Exception) {
        pause("${e.message} Press Enter to continue.")
    }
}

func addDevice(manager: AirConditionerManager) {
    print("Please enter the device ID: ")
    let idStr = getStdIn().readln() ?? ""
    try {
        let id = parseInteger(idStr)
        print("Please enter the device name: ")
        let name = getStdIn().readln() ?? ""
        manager.addAirConditioner(AirConditionerDevice(id, name))
        pause("Device added successfully! Press Enter to continue.")
    } catch (e: Exception) {
        pause("${e.message} Press Enter to continue.")
    }
}

func deleteDevice(manager: AirConditionerManager) {
    if (manager.airconditioners.size == 0) {
        pause("There are no devices. Press Enter to continue.")
        return
    }
    listDevices(manager)
    print("Please enter the device ID: ")
    let idStr = getStdIn().readln() ?? ""
    try {
        let id = parseInteger(idStr)
        let index = manager.indexOfDevice(id)
        if (index < 0) {
            throw Exception("No device with ID ${id} was found.")
        }
        manager.removeAirConditioner(index)
        pause("Device deleted successfully! Press Enter to continue.")
    } catch (e: Exception) {
        pause("${e.message} Press Enter to continue.")
    }
}

main(): Int64 {
    let manager = AirConditionerManager.getInstance()
    while (true) {
        unsafe { clearScreen() }
        println("========================================")
        println("======Smart Air Conditioner Device Management Software======")
        println("========================================")
        println()
        println("Please enter command: [1] Configure Device [2] Add Device [3] Delete Device [4] Exit Software")
        match (getStdIn().readln() ?? "") {
            case "1" => configureDevice(manager)
            case "2" => addDevice(manager)
            case "3" => deleteDevice(manager)
            case "4" => break
            case _ => pause("Command input error, please re-enter! Press Enter to continue.")
        }
    }
    return 0
}