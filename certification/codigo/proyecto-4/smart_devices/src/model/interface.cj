package smart_devices.model

// Interfaz para dispositivos que se pueden encender y apagar.
public interface Openable {
    prop isOpened: Bool
    func open(): Unit
    func close(): Unit
    func togglePower(): Unit
}

// Interfaz de monitoreo de temperatura.
public interface TemperatureMonitoring {
    prop temperature: Float64
    func update(): Unit
}

// Interfaz de monitoreo de humedad.
public interface HumidityMonitoring {
    prop humidity: Float64
    func update(): Unit
}