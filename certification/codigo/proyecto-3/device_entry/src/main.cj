package device_entry

import std.collection.*
import std.convert.*
import std.env.*

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

func inputDeviceID(registeredIds: ArrayList<Int64>): Int64 {
    var id = 0
    while (true) {
        print("Ingrese el ID de la máquina (1001-1100): ")
        try {
            let input = getStdIn().readln().getOrThrow()
            id = Int64.parse(input)
            if (id < 1001 || id > 1100) {
                throw Exception("El ID debe ser un entero entre 1001 y 1100.")
            }
            if (registeredIds.contains(id)) {
                throw Exception("El ID ya está registrado; debe ser único.")
            }
            break
        } catch (e: Exception) {
            println("Error: ${e}")
            println("Intente nuevamente.")
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

main(): Int64 {
    println("======= Registro de máquina expendedora =======")
    var registeredIds = ArrayList<Int64>()
    let id = inputDeviceID(registeredIds)
    registeredIds.add(id)
    let district = inputDistrict()
    println("ID de máquina: ${id}, Zona: ${district.toString()}")
    return 0
}