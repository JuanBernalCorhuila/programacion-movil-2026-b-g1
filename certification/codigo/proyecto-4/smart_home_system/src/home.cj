package smart_home_system

import std.collection.*

class Room {
    public var id: Int64
    public var name: String
    public var kind: String

    public init(id: Int64, name: String, kind: String) {
        this.id = id
        this.name = name
        this.kind = kind
    }
}

class SmartHome {
    public let devices = ArrayList<Device>()
    public let rooms = ArrayList<Room>()

    public init() {
    }

    public func seed(): Unit {
        rooms.add(Room(2001, "Camilo's Bedroom", "Bedroom"))
        rooms.add(Room(2002, "Living Room", "Living Room"))
        rooms.add(Room(2003, "Bathroom", "Bathroom"))

        let sensor = SensorDevice(1001, "Climate Sensor", "Camilo's Bedroom")
        sensor.connect()
        sensor.powerOn()
        devices.add(sensor)
        devices.add(AirPurifierDevice(1002, "Air Purifier", "Camilo's Bedroom"))
        devices.add(AirConditionerDevice(1003, "Air Conditioner", "Living Room"))
        devices.add(BodyFatScaleDevice(1004, "Body Fat Scale", "Bathroom"))
        devices.add(CurtainDevice(1005, "Bedroom Curtain", "Camilo's Bedroom"))
        devices.add(LightDevice(1006, "Ceiling Light", "Living Room"))
    }

    public func roomExists(name: String): Bool {
        for (r in rooms) {
            if (r.name == name) {
                return true
            }
        }
        return false
    }

    public func checkLocation(location: String): Unit {
        if (location != "Unassigned" && !roomExists(location)) {
            throw Exception("Room '${location}' does not exist.")
        }
    }

    public func getDevice(id: Int64): Device {
        for (d in devices) {
            if (d.id == id) {
                return d
            }
        }
        throw Exception("Device ${id} not found.")
    }

    public func getRoom(id: Int64): Room {
        for (r in rooms) {
            if (r.id == id) {
                return r
            }
        }
        throw Exception("Room ${id} not found.")
    }

    public func devicesIn(roomName: String): ArrayList<Device> {
        let result = ArrayList<Device>()
        for (d in devices) {
            if (d.location == roomName) {
                result.add(d)
            }
        }
        return result
    }

    public func addDevice(kind: Int64, id: Int64, name: String, location: String): Unit {
        for (d in devices) {
            if (d.id == id) {
                throw Exception("Device ID ${id} already exists.")
            }
        }
        checkLocation(location)
        var dev: Device = SensorDevice(id, name, location)
        if (kind == 2) {
            dev = AirPurifierDevice(id, name, location)
        } else if (kind == 3) {
            dev = BodyFatScaleDevice(id, name, location)
        } else if (kind == 4) {
            dev = AirConditionerDevice(id, name, location)
        } else if (kind == 5) {
            dev = CurtainDevice(id, name, location)
        } else if (kind == 6) {
            dev = LightDevice(id, name, location)
        }
        devices.add(dev)
    }

    public func removeDevice(id: Int64): Unit {
        var idx = -1
        var i = 0
        while (i < devices.size) {
            if (devices[i].id == id) {
                idx = i
            }
            i += 1
        }
        if (idx < 0) {
            throw Exception("Device ${id} not found.")
        }
        devices.remove(at: idx)
    }

    public func moveDevice(id: Int64, location: String): Unit {
        let dev = getDevice(id)
        checkLocation(location)
        dev.location = location
    }

    public func addRoom(id: Int64, name: String, kind: String): Unit {
        for (r in rooms) {
            if (r.id == id) {
                throw Exception("Room ID ${id} already exists.")
            }
            if (r.name == name) {
                throw Exception("A room named '${name}' already exists.")
            }
        }
        rooms.add(Room(id, name, kind))
    }

    public func removeRoom(id: Int64): Int64 {
        let room = getRoom(id)
        var moved = 0
        for (d in devices) {
            if (d.location == room.name) {
                d.location = "Unassigned"
                moved += 1
            }
        }
        var idx = 0
        var i = 0
        while (i < rooms.size) {
            if (rooms[i].id == id) {
                idx = i
            }
            i += 1
        }
        rooms.remove(at: idx)
        return moved
    }

    public func roomClimate(roomName: String): String {
        for (d in devices) {
            if (d.location == roomName && d.connected && d.powered) {
                match (d) {
                    case s: SensorDevice => return "${fmt1(s.temperature)} C / ${fmt1(s.humidity)} %"
                    case _ => ()
                }
            }
        }
        return "-- / --"
    }
}