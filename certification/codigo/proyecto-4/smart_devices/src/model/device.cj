package smart_devices.model

import std.random.*

// Un decimal sin depender de std.format (22.46 -> "22.5").
func fmt1(x: Float64): String {
    let tenths = Int64(x * 10.0 + 0.5)
    return "${tenths / 10}.${tenths % 10}"
}

// Mantiene un valor simulado dentro de un rango razonable.
func clamp(x: Float64, low: Float64, high: Float64): Float64 {
    if (x < low) {
        return low
    }
    if (x > high) {
        return high
    }
    return x
}

// ---------- Superclase ----------
public open class Device {
    static prop deviceType: String {
        get() { "DEVICE" }
    }

    private var _deviceId: Int64

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

    protected var deviceName: String
    protected var isOnline: Bool = false

    // Lectura del estado de conexión desde otros paquetes.
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
}

// ---------- Clase abstracta de dispositivos con batería ----------
public abstract class ChargeableDevice <: Device {
    redef static prop deviceType: String {
        get() { "CHARGEABLE_DEVICE" }
    }

    protected var batteryPercentage: UInt8 = 100

    public init(deviceId: Int64, deviceName: String) {
        super(deviceId, deviceName)
    }

    public init(deviceId: Int64, deviceName: String, batteryPercentage: UInt8) {
        super(deviceId, deviceName)
        this.batteryPercentage = batteryPercentage
    }

    // Gasta 1 % de batería, sin bajar de 0 (un UInt8 desbordaría).
    protected func consumeBattery() {
        if (batteryPercentage > 0) {
            batteryPercentage--
        }
    }

    public func showBatteryInformation(): Unit
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

    // Simula temperatura, humedad y PM2.5.
    private func measureAir() {
        _temperature = rng.nextGaussianFloat64(mean: 28.0, sigma: 1.0)
        _humidity = clamp(rng.nextGaussianFloat64(mean: 50.0, sigma: 15.0), 0.0, 100.0)
        _pm25 = clamp(rng.nextGaussianFloat64(mean: 30.0, sigma: 10.0), 0.0, 500.0)
    }

    // Encender no significa estar conectado.
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

    public func displayStatues() {
        update()
        println("--------- ${deviceId} ${deviceName} ---------")
        println("Connection Status: ${isOnline}")
        if (_isOpened) {
            println("Current Status: Powered On - PM2.5: ${fmt1(_pm25)}μg/m³ ${fmt1(_temperature)}°C ${Int64(_humidity)}%")
        } else {
            println("Current Status: Powered Off")
        }
    }
}

// ---------- Sensor de temperatura y humedad ----------
public class SensorDevice <: ChargeableDevice & TemperatureMonitoring & HumidityMonitoring {
    redef static prop deviceType: String {
        get() { "SENSOR_DEVICE" }
    }

    private let rng = Random()
    private var _humidity: Float64 = 0.0
    private var _temperature: Float64 = 0.0

    public prop humidity: Float64 {
        get() { _humidity }
    }

    public prop temperature: Float64 {
        get() { _temperature }
    }

    public init(deviceId: Int64, deviceName: String) {
        super(deviceId, deviceName)
        readSensor()
    }

    private func readSensor() {
        _temperature = rng.nextGaussianFloat64(mean: 28.0, sigma: 1.0)
        _humidity = clamp(rng.nextGaussianFloat64(mean: 50.0, sigma: 15.0), 0.0, 100.0)
    }

    // Si está desconectado no actualiza; al actualizar gasta batería.
    public func update(): Unit {
        if (!isOnline) {
            return
        }
        readSensor()
        consumeBattery()
    }

    public func showBatteryInformation() {
        println("Current battery level: ${batteryPercentage}%")
    }

    public func displayStatues() {
        update()
        println("--------- ${deviceId} ${deviceName} ---------")
        println("Connection Status: ${isOnline}")
        showBatteryInformation()
        println("Current Status: ${fmt1(_temperature)}°C ${Int64(_humidity)}%")
    }
}

// ---------- Báscula de grasa corporal ----------
public class BodyFatScaleDevice <: ChargeableDevice {
    redef static prop deviceType: String {
        get() { "BODY_FAT_SCALE_DEVICE" }
    }

    public init(deviceId: Int64, deviceName: String) {
        super(deviceId, deviceName)
    }

    // Peso e IMC simulados; sin conexión no hay medición.
    public func measure(): (Option<Float64>, Option<Float64>) {
        if (!isOnline) {
            return (None, None)
        }
        let rng = Random()
        let weight = clamp(rng.nextGaussianFloat64(mean: 60.0, sigma: 15.0), 30.0, 150.0)
        let bmi = clamp(rng.nextGaussianFloat64(mean: 20.0, sigma: 2.0), 12.0, 40.0)
        consumeBattery()
        return (Some(weight), Some(bmi))
    }

    public func showBatteryInformation() {
        if (batteryPercentage > 20) {
            println("Battery is sufficient.")
        } else {
            println("Low battery, please recharge in time.")
        }
    }

    public func displayStatues() {
        println("--------- ${deviceId} ${deviceName} ---------")
        showBatteryInformation()
        println("Connection Status: ${isOnline}")
    }
}