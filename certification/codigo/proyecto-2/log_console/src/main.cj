package log_console

import std.convert.*
import stdx.logger.*
import std.env.*

main(): Int64 {
    // 1. Entrada de datos: String, Int64, Float64 y Bool
    println("¿Cuál es el nombre del campus?")
    let campusName: String = getStdIn().readln().getOrThrow()

    println("¿Cuál es el número de edificios?")
    let buildingNum: Int64 = Int64.parse(getStdIn().readln().getOrThrow())

    println("¿Cuál es el área construida del campus?")
    let buildingArea: Float64 = Float64.parse(getStdIn().readln().getOrThrow())

    // Latitud y longitud: Float64 porque tienen decimales
    println("¿Cuál es la latitud del campus?")
    let latitude: Float64 = Float64.parse(getStdIn().readln().getOrThrow())

    println("¿Cuál es la longitud del campus?")
    let longitude: Float64 = Float64.parse(getStdIn().readln().getOrThrow())

    println("¿Es el campus inteligente (si/no)?")
    let isSmartCampus: Bool = getStdIn().readln().getOrThrow() == "si"

    // 2. Log en consola
    let logger = SimpleLogger(getStdOut())
    let event = "Evento: registro de campus "
    var message = "Mensaje: "
    message += "Campus: ${campusName} "
    message += "Edificios: ${buildingNum} "
    message += "Área: ${buildingArea.format(".1")} "
    message += "Latitud: ${latitude.format(".6")} "
    message += "Longitud: ${longitude.format(".6")} "
    message += "Campus inteligente: ${isSmartCampus}"

    logger.info(event + message)
    return 0
}