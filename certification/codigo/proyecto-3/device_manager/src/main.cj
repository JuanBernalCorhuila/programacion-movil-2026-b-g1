package device_manager

import std.collection.*
import std.env.*
import std.convert.*

enum District {
    | Norte
    | Sur
    | Oriente
    | Occidente
    | Centro

    func toString(): String {
        match (this) {
            case District.Norte => "Norte"
            case District.Sur => "Sur"
            case District.Oriente => "Oriente"
            case District.Occidente => "Occidente"
            case District.Centro => "Centro"
        }
    }
}

// Máquinas registradas y sus zonas.
let devices = ArrayList<(Int64, String)>()
let deviceIDs = HashSet<Int64>()

main(): Int64 {
    println("======= Gestión de máquinas expendedoras =======")
    while (true) {
        println("Menú: [1] Imprimir [2] Agregar [3] Eliminar [4] Modificar [5] Consultar (zona) [6] Resumen por zona [7] Salir")
        let order = getStdIn().readln() ?? ""
        match (order) {
            case "1" => printDevices()
            case "2" => addDevice()
            case "3" => removeDevices()
            case "4" => updateDevices()
            case "5" => selectDevices()
            case "6" => summarizeByDistrict()
            case "7" => break
            case _ => println("Opción inválida, intente nuevamente.")
        }
    }
    return 0
}

func inputDeviceID(): Int64 {
    var id = 0
    while (true) {
        print("Ingrese el ID de la máquina (1001-1100): ")
        try {
            let input = getStdIn().readln().getOrThrow()
            id = Int64.parse(input)
            if (id < 1001 || id > 1100) {
                throw Exception("El ID debe ser un entero entre 1001 y 1100.")
            }
            break
        } catch (e: Exception) {
            println("Error: ${e.message}")
        }
    }
    return id
}

func inputDistrict(): District {
    var district = District.Norte
    while (true) {
        print("Ingrese la zona de Neiva (Norte, Sur, Oriente, Occidente, Centro): ")
        let input = getStdIn().readln().getOrThrow()
        let valid = match (input) {
            case "Norte" => district = District.Norte; true
            case "Sur" => district = District.Sur; true
            case "Oriente" => district = District.Oriente; true
            case "Occidente" => district = District.Occidente; true
            case "Centro" => district = District.Centro; true
            case _ => println("Error: zona inválida o vacía. Intente nuevamente."); false
        }
        if (valid) {
            break
        }
    }
    return district
}

func printDevices() {
    println("Total de máquinas: ${devices.size}")
    for (device in devices) {
        println("ID: ${device[0]}, Zona: ${device[1]}")
    }
}

func addDevice() {
    var id = inputDeviceID()
    while (deviceIDs.contains(id)) {
        println("El ID ya está registrado, ingrese otro.")
        id = inputDeviceID()
    }
    deviceIDs.add(id)
    let location = inputDistrict().toString()
    devices.add((id, location))
    println("Registro exitoso. ID: ${id}, Zona: ${location}")
}

func removeDevices() {
    let id = inputDeviceID()
    for (i in 0..devices.size) {
        if (devices[i][0] == id) {
            devices.remove(at: i)
            deviceIDs.remove(id)
            println("Máquina ${id} eliminada.")
            return
        }
    }
    println("La máquina ${id} no existe.")
}

func updateDevices() {
    let id = inputDeviceID()
    for (i in 0..devices.size) {
        if (devices[i][0] == id) {
            println("Nueva zona para la máquina ${id}:")
            let district = inputDistrict().toString()
            devices[i] = (id, district)
            println("Máquina ${id} actualizada a ${district}.")
            return
        }
    }
    println("La máquina ${id} no existe.")
}

func selectDevices() {
    var num = 0
    let district = inputDistrict().toString()
    for (device in devices) {
        if (device[1] == district) {
            println("ID: ${device[0]}, Zona: ${device[1]}")
            num++
        }
    }
    if (num == 0) {
        println("No hay máquinas en la zona ${district}.")
    } else {
        println("Total en ${district}: ${num}")
    }
}

// Muestra el total de máquinas registradas en cada zona.
func summarizeByDistrict() {
    let districts = [
        District.Norte,
        District.Sur,
        District.Oriente,
        District.Occidente,
        District.Centro
    ]

    println("Resumen de máquinas por zona:")
    for (district in districts) {
        var total = 0
        let districtName = district.toString()
        for (device in devices) {
            if (device[1] == districtName) {
                total++
            }
        }
        println("${districtName}: ${total}")
    }
}
