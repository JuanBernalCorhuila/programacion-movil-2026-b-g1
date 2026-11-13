package smart_home_system

import std.collection.*

func printDeviceTable(devs: ArrayList<Device>): Unit {
    println(pad("ID", 7) + pad("Name", 22) + pad("Type", 22) + pad("Connection", 14) + pad("Switch", 8) + pad("Location", 20) + "Monitoring")
    for (d in devs) {
        println(pad(d.id.toString(), 7) + pad(d.name, 22) + pad(d.typeName(), 22) + pad(d.connText(), 14) + pad(d.switchText(), 8) + pad(d.location, 20) + d.mainParams())
    }
    if (devs.size == 0) {
        println("  (no devices)")
    }
}

func printRoomTable(home: SmartHome): Unit {
    println(pad("ID", 7) + pad("Name", 22) + pad("Type", 14) + pad("Devices", 9) + "Temp / Humidity")
    for (r in home.rooms) {
        let qty = home.devicesIn(r.name).size
        println(pad(r.id.toString(), 7) + pad(r.name, 22) + pad(r.kind, 14) + pad(qty.toString(), 9) + home.roomClimate(r.name))
    }
    if (home.rooms.size == 0) {
        println("  (no rooms)")
    }
}

func printRoomNames(home: SmartHome): Unit {
    var names = "Unassigned"
    for (r in home.rooms) {
        names = names + ", " + r.name
    }
    println("Available locations: ${names}")
}

func addDeviceFlow(home: SmartHome): Unit {
    println("Types: [1] Temp/Humidity Sensor  [2] Air Purifier  [3] Body Fat Scale")
    println("       [4] Air Conditioner  [5] Curtain  [6] Lighting")
    let kind = readInt("Device type: ", 1, 6)
    let id = readInt("Device ID: ", 1, 999999)
    let name = readNonEmpty("Device name: ")
    printRoomNames(home)
    var location = readText("Location (empty = Unassigned): ")
    if (location.size == 0) {
        location = "Unassigned"
    }
    home.addDevice(kind, id, name, location)
    println("Device ${id} added.")
    pause()
}

func deleteDeviceFlow(home: SmartHome): Unit {
    let id = readInt("Device ID to delete: ", 1, 999999)
    let dev = home.getDevice(id)
    home.removeDevice(id)
    println("Device '${dev.name}' deleted.")
    pause()
}

func moveDeviceFlow(home: SmartHome): Unit {
    let id = readInt("Device ID to move: ", 1, 999999)
    let dev = home.getDevice(id)
    printRoomNames(home)
    let location = readNonEmpty("New location: ")
    home.moveDevice(id, location)
    println("Device '${dev.name}' moved to ${location}.")
    pause()
}

func deviceListMode(home: SmartHome): Unit {
    var running = true
    while (running) {
        clearConsole()
        println("================ Device List Mode ================")
        printDeviceTable(home.devices)
        println("")
        println("[1] Add Device")
        println("[2] Delete Device")
        println("[3] Move Device")
        println("[4] Configure Device (control panel)")
        println("[0] Back")
        try {
            let choice = readInt("Select an option: ", 0, 4)
            if (choice == 0) {
                running = false
            } else if (choice == 1) {
                addDeviceFlow(home)
            } else if (choice == 2) {
                deleteDeviceFlow(home)
            } else if (choice == 3) {
                moveDeviceFlow(home)
            } else {
                let id = readInt("Device ID: ", 1, 999999)
                home.getDevice(id).panel()
            }
        } catch (e: Exception) {
            println("Error: ${e.message}")
            pause()
        }
    }
}

func addRoomFlow(home: SmartHome): Unit {
    let id = readInt("Room ID: ", 1, 999999)
    let name = readNonEmpty("Room name: ")
    println("Types: [1] Bedroom  [2] Living Room  [3] Kitchen  [4] Bathroom")
    let t = readInt("Room type: ", 1, 4)
    var kind = "Bedroom"
    if (t == 2) {
        kind = "Living Room"
    } else if (t == 3) {
        kind = "Kitchen"
    } else if (t == 4) {
        kind = "Bathroom"
    }
    home.addRoom(id, name, kind)
    println("Room '${name}' added.")
    pause()
}

func deleteRoomFlow(home: SmartHome): Unit {
    let id = readInt("Room ID to delete: ", 1, 999999)
    let moved = home.removeRoom(id)
    println("Room deleted. ${moved} device(s) moved to Unassigned.")
    pause()
}

func roomPanel(home: SmartHome, room: Room): Unit {
    var running = true
    while (running) {
        clearConsole()
        let inRoom = home.devicesIn(room.name)
        println("=========== Room Device Control Panel ===========")
        println("Room ${room.id}: ${room.name} (${room.kind}) | Devices: ${inRoom.size} | Temp / Humidity: ${home.roomClimate(room.name)}")
        println("")
        printDeviceTable(inRoom)
        println("")
        println("[1] Configure Device Independently")
        println("[2] Turn On and Connect All Devices")
        println("[3] Turn Off All Devices")
        println("[0] Back")
        try {
            let choice = readInt("Select an option: ", 0, 3)
            if (choice == 0) {
                running = false
            } else if (choice == 1) {
                let id = readInt("Device ID: ", 1, 999999)
                let dev = home.getDevice(id)
                if (dev.location != room.name) {
                    throw Exception("Device ${id} is not in this room.")
                }
                dev.panel()
            } else if (choice == 2) {
                for (d in inRoom) {
                    if (!d.connected) {
                        d.connect()
                    }
                    d.powerOn()
                }
                println("All devices in the room are connected and on.")
                pause()
            } else {
                for (d in inRoom) {
                    d.powerOff()
                }
                println("All devices in the room are off.")
                pause()
            }
        } catch (e: Exception) {
            println("Error: ${e.message}")
            pause()
        }
    }
}

func roomListMode(home: SmartHome): Unit {
    var running = true
    while (running) {
        clearConsole()
        println("================= Room List Mode =================")
        printRoomTable(home)
        println("")
        println("[1] Add Room")
        println("[2] Delete Room")
        println("[3] Manage Room Devices")
        println("[0] Back")
        try {
            let choice = readInt("Select an option: ", 0, 3)
            if (choice == 0) {
                running = false
            } else if (choice == 1) {
                addRoomFlow(home)
            } else if (choice == 2) {
                deleteRoomFlow(home)
            } else {
                let id = readInt("Room ID: ", 1, 999999)
                roomPanel(home, home.getRoom(id))
            }
        } catch (e: Exception) {
            println("Error: ${e.message}")
            pause()
        }
    }
}

main() {
    let home = SmartHome()
    home.seed()
    var running = true
    while (running) {
        clearConsole()
        println("========== Smart Home Device Management ==========")
        println("[1] Device List Mode")
        println("[2] Room List Mode")
        println("[0] Exit")
        try {
            let choice = readInt("Select an option: ", 0, 2)
            if (choice == 0) {
                running = false
            } else if (choice == 1) {
                deviceListMode(home)
            } else {
                roomListMode(home)
            }
        } catch (e: Exception) {
            println("Error: ${e.message}")
            pause()
        }
    }
    println("Goodbye!")
}