package smart_home.model

import std.collection.*

// Tipo de habitación.
public enum RoomType {
    | LIVING_ROOM
    | BED_ROOM
}

// Habitación con su lista de dispositivos.
public class Room {
    protected var roomId: Int64
    protected var roomName: String
    protected var roomType: RoomType
    protected let devices = ArrayList<Device>()

    // Lectura pública de datos de la habitación.
    public prop id: Int64 {
        get() { roomId }
    }

    public prop name: String {
        get() { roomName }
    }

    public prop deviceList: ArrayList<Device> {
        get() { devices }
    }

    public prop devicesCount: Int64 {
        get() { devices.size }
    }

    // Humedad: la del primer dispositivo conectado que sepa medirla.
    public prop humidity: Option<Float64> {
        get() {
            var res: Option<Float64> = None
            for (device in devices) {
                if (device is HumidityMonitoring && device.online) {
                    let monitor = (device as HumidityMonitoring).getOrThrow()
                    res = Some(monitor.humidity)
                    break
                }
            }
            res
        }
    }

    // Temperatura: la del primer dispositivo conectado que sepa medirla.
    public prop temperature: Option<Float64> {
        get() {
            var res: Option<Float64> = None
            for (device in devices) {
                if (device is TemperatureMonitoring && device.online) {
                    let monitor = (device as TemperatureMonitoring).getOrThrow()
                    res = Some(monitor.temperature)
                    break
                }
            }
            res
        }
    }

    public init(roomId: Int64, roomName: String, roomType: RoomType) {
        this.roomId = roomId
        this.roomName = roomName
        this.roomType = roomType
    }

    public func addDevice(device: Device) {
        devices.add(device)
    }

    public func removeDeviceById(deviceId: Int64) {
        devices.removeIf({ d: Device => d.deviceId == deviceId })
    }

    // Control grupal: enciende todos los dispositivos que se pueden encender.
    public func openAllDevices() {
        for (device in devices) {
            if (device is Openable) {
                (device as Openable).getOrThrow().open()
            }
        }
    }

    public func connectAllDevices() {
        for (device in devices) {
            device.connect()
        }
    }

    // Apaga todos (al apagar, cada uno se desconecta solo).
    public func closeAllDevices() {
        for (device in devices) {
            if (device is Openable) {
                (device as Openable).getOrThrow().close()
            }
        }
    }
}

// Administrador de habitaciones (singleton).
public class RoomManager {
    public let rooms: ArrayList<Room>

    private init() {
        rooms = ArrayList<Room>()

        let bedroom = Room(2001, "Camilo's Bedroom", RoomType.BED_ROOM)
        bedroom.addDevice(AirPurifierDevice(1001, "Bedroom Air Purifier"))
        bedroom.addDevice(AirConditionerDevice(1002, "Bedroom Air Conditioner"))
        rooms.add(bedroom)

        let livingRoom = Room(2002, "Living Room", RoomType.LIVING_ROOM)
        livingRoom.addDevice(AirConditionerDevice(2001, "Living Room Air Conditioner"))
        rooms.add(livingRoom)
    }

    private static let instance: RoomManager = RoomManager()

    public static func getInstance(): RoomManager {
        return instance
    }
}