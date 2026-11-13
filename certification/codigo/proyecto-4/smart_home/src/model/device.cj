package smart_home.model

import std.env.*
import std.random.*

// Modo del ventilador: tres niveles.
public enum FanSpeed {
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

// ---------- Superclase ----------
public open class Device {
    static prop deviceType: String {
        get() { "DEVICE" }
    }

    private var _deviceId: Int64

    // El ID debe ser un entero positivo.
    public mut prop deviceId: Int64 {
        get() { _deviceId }
        set(id) {
            if (id <= 0) {
                throw Exception("Device ID must be a positive integer.")
            }
            _deviceId = id
        }
    }

    protected var deviceName: String
    protected var isOnline: Bool = false

    // Lectura pública del nombre y de la conexión.
    public prop name: String {
        get() { deviceName }
    }

    public prop online: Bool {
        get() { isOnline }
    }

    public init(deviceId: Int64, deviceName: String) {
        if (deviceId <= 0) {
            throw Exception("Device ID must be a positive integer.")
        }
        this._deviceId = deviceId
        this.deviceName = deviceName
    }

    // Un dispositivo apagado no se puede conectar.
    public func connect() {
        if (this is Openable) {
            let openable = this as Openable
            if (!openable.getOrThrow().isOpened) {
                return
            }
        }
        isOnline = true
    }

    public func disconnect() {
        isOnline = false
    }

    // Las subclases sobrescriben estas dos funciones (polimorfismo).
    public open func displayStatuses() {
        println("Status display is not implemented!")
    }

    public open func operate() {
        println("Operation is not implemented!")
    }
}

// ---------- Purificador de aire ----------
public class AirPurifierDevice <: Device & Openable & TemperatureMonitoring & HumidityMonitoring {
    redef static prop deviceType: String {
        get() { "AIR_PURIFIER_DEVICE" }
    }

    private let rng = Random()
    private var _humidity: Float64 = 0.0
    private var _temperature: Float64 = 0.0
    private var _isOpened: Bool = false
    private var _pm25: Float64 = 0.0

    public prop humidity: Float64 {
        get() { _humidity }
    }

    public prop temperature: Float64 {
        get() { _temperature }
    }

    public prop isOpened: Bool {
        get() { _isOpened }
    }

    public prop pm25: Float64 {
        get() { _pm25 }
    }

    public init(deviceId: Int64, deviceName: String) {
        super(deviceId, deviceName)
    }

    private func measureAir() {
        _temperature = rng.nextGaussianFloat64(mean: 28.0, sigma: 1.0)
        _humidity = clamp(rng.nextGaussianFloat64(mean: 50.0, sigma: 15.0), 0.0, 100.0)
        _pm25 = clamp(rng.nextGaussianFloat64(mean: 30.0, sigma: 10.0), 0.0, 500.0)
    }

    public func open(): Unit {
        _isOpened = true
        measureAir()
    }

    // Apagar siempre desconecta.
    public func close(): Unit {
        _isOpened = false
        isOnline = false
    }

    public func togglePower(): Unit {
        if (_isOpened) {
            close()
        } else {
            open()
        }
    }

    // Solo se actualiza si está encendido y conectado.
    public func update(): Unit {
        if (!_isOpened || !isOnline) {
            return
        }
        measureAir()
    }

    public override func displayStatuses() {
        update()
        println("--------- ${deviceId} ${deviceName} ---------")
        println("Connection status: ${isOnline}")
        if (_isOpened) {
            println("Current status: On PM2.5: ${fmt1(_pm25)}μg/m³ ${fmt1(_temperature)}°C ${Int64(_humidity)}%")
        } else {
            println("Current status: Off")
        }
    }

    // Panel de control del purificador.
    public override func operate() {
        while (true) {
            clearConsole()
            displayStatuses()
            println("Operations: [1] Connect/Disconnect [2] Power [3] Update [4] Back")
            let order = getStdIn().readln() ?? ""
            match (order) {
                case "1" =>
                    if (isOnline) {
                        disconnect()
                    } else if (!_isOpened) {
                        pause("The device is off, turn it on first. Press Enter to continue.")
                    } else {
                        connect()
                    }
                case "2" => togglePower()
                case "3" => update()
                case "4" => break
                case _ => pause("Command input error, please re-enter! Press Enter to continue.")
            }
        }
    }
}

// ---------- Aire acondicionado ----------
public class AirConditionerDevice <: Device & Openable & TemperatureMonitoring & HumidityMonitoring {
    redef static prop deviceType: String {
        get() { "AIR_CONDITIONER_DEVICE" }
    }

    private let rng = Random()
    private var _humidity: Float64 = 0.0
    private var _temperature: Float64 = 0.0
    private var _isOpened: Bool = false
    private var _targetTemperature: Int64 = 25
    public var fanSpeed: FanSpeed = FanSpeed.MIDDLE

    public prop humidity: Float64 {
        get() { _humidity }
    }

    public prop temperature: Float64 {
        get() { _temperature }
    }

    public prop isOpened: Bool {
        get() { _isOpened }
    }

    // La temperatura objetivo debe estar entre 16 y 28.
    public mut prop targetTemperature: Int64 {
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

    public init(deviceId: Int64, deviceName: String) {
        super(deviceId, deviceName)
    }

    private func measureRoom() {
        _temperature = rng.nextGaussianFloat64(mean: 28.0, sigma: 1.0)
        _humidity = clamp(rng.nextGaussianFloat64(mean: 50.0, sigma: 15.0), 0.0, 100.0)
    }

    public func open(): Unit {
        _isOpened = true
        measureRoom()
    }

    // Al apagar se desconecta y se reinician temperatura y humedad.
    public func close(): Unit {
        _isOpened = false
        isOnline = false
        _temperature = 0.0
        _humidity = 0.0
    }

    public func togglePower(): Unit {
        if (_isOpened) {
            close()
        } else {
            open()
        }
    }

    public func update(): Unit {
        if (!_isOpened || !isOnline) {
            return
        }
        measureRoom()
    }

    // Cicla entre los tres niveles de ventilador.
    public func toggleFanSpeed() {
        fanSpeed = match (fanSpeed) {
            case LOW => MIDDLE
            case MIDDLE => HIGH
            case HIGH => LOW
        }
    }

    public override func displayStatuses() {
        update()
        println("--------- ${deviceId} ${deviceName} ---------")
        println("Connection status: ${isOnline}")
        if (_isOpened) {
            println("Current status: On ${fmt1(_temperature)}°C ${Int64(_humidity)}%")
        } else {
            println("Current status: Off")
        }
        println("Preset temperature: ${targetTemperature}°C")
        println("Fan speed mode: ${fanSpeed.toString()}")
    }

    // Panel de control del aire acondicionado.
    public override func operate() {
        while (true) {
            clearConsole()
            displayStatuses()
            println("Operation: [1] Connect/Disconnect [2] Power [3] Temperature [4] Fan Speed [5] Exit")
            let order = getStdIn().readln() ?? ""
            match (order) {
                case "1" =>
                    if (isOnline) {
                        disconnect()
                    } else if (!_isOpened) {
                        pause("The device is off, turn it on first. Press Enter to continue.")
                    } else {
                        connect()
                    }
                case "2" => togglePower()
                case "3" =>
                    // Solo se configura si está encendido y en línea.
                    if (_isOpened && isOnline) {
                        clearConsole()
                        displayStatuses()
                        print("Please enter temperature (16~28): ")
                        try {
                            targetTemperature = Utils.inputInfo<Int64>(16, 28)
                        } catch (e: Exception) {
                            pause("${e.message} Press Enter to continue.")
                        }
                    } else {
                        pause("The device must be on and online to configure it. Press Enter to continue.")
                    }
                case "4" =>
                    if (_isOpened && isOnline) {
                        toggleFanSpeed()
                    } else {
                        pause("The device must be on and online to configure it. Press Enter to continue.")
                    }
                case "5" => break
                case _ => pause("Command input error, please re-enter! Press Enter to continue.")
            }
        }
    }
}