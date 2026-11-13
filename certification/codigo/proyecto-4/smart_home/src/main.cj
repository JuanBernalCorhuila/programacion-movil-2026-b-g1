package smart_home

import smart_home.model.*

// Muestra un valor opcional con un decimal, o N/A si no hay dispositivo conectado.
func showValue(value: Option<Float64>, unit: String): String {
    match (value) {
        case Some(v) => "${fmt1(v)}${unit}"
        case None => "N/A"
    }
}

func printRoomSummary(room: Room) {
    println("=== Room: ${room.id} ${room.name} ===")
    println("Devices: ${room.devicesCount}")
    println("Temperature: ${showValue(room.temperature, "°C")}, Humidity: ${showValue(room.humidity, "%")}")
}

// Control de los dispositivos dentro de una habitación.
func manageDevice(room: Room) {
    while (true) {
        clearConsole()
        println("======= Smart Home Device Management Software =======")
        printRoomSummary(room)
        for (device in room.deviceList) {
            println("${device.deviceId} ${device.name} Connection Status: ${device.online}")
        }
        let n = room.deviceList.size
        print("Select Device: ")
        for (i in 0..n) {
            print("[${i + 1}] ${room.deviceList[i].name} ")
        }
        print("[${n + 1}] Open and connect all devices ")
        print("[${n + 2}] Close all devices ")
        println("[${n + 3}] Return")
        try {
            let choice = Utils.inputInfo<Int64>(1, n + 3)
            if (choice <= n) {
                // Polimorfismo: cada dispositivo muestra su propio panel.
                room.deviceList[choice - 1].operate()
            } else if (choice == n + 1) {
                room.openAllDevices()
                room.connectAllDevices()
            } else if (choice == n + 2) {
                room.closeAllDevices()
            } else {
                break
            }
        } catch (e: Exception) {
            pause("${e.message} Press Enter to continue.")
        }
    }
}

main(): Int64 {
    // Se inicializa el administrador y se encienden y conectan todos los dispositivos.
    let roomManager = RoomManager.getInstance()
    for (room in roomManager.rooms) {
        room.openAllDevices()
        room.connectAllDevices()
    }

    while (true) {
        clearConsole()
        println("======= Smart Home Device Management Software =======")
        for (room in roomManager.rooms) {
            printRoomSummary(room)
        }
        let n = roomManager.rooms.size
        print("Select Room: ")
        for (i in 0..n) {
            print("[${i + 1}] ${roomManager.rooms[i].name} ")
        }
        println("[${n + 1}] Exit")
        try {
            let choice = Utils.inputInfo<Int64>(1, n + 1)
            if (choice == n + 1) {
                break
            }
            manageDevice(roomManager.rooms[choice - 1])
        } catch (e: Exception) {
            pause("${e.message} Press Enter to continue.")
        }
    }
    return 0
}