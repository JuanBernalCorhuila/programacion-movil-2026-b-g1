package log_file

import std.random.*
import std.convert.*
import stdx.logger.*
import std.fs.*
import std.env.*

main(): Int64 {
    // Mantiene el menú activo hasta que el usuario salga o ocurra un error.
    while (true) {
        // Abre el archivo para agregar nuevos registros sin borrar los anteriores.
        try (file = File(Path("./log.txt"), Append)) {          
            print("Seleccione el dato en tiempo real a guardar: ")
            println("[1] Control de acceso [2] Parqueadero [3] Videovigilancia [4] Cuarto de servidores [5] Salir")

            let input = getStdIn().readln().getOrThrow()
            var event = "Evento: "
            var message = "Mensaje: "

            if (input == "1") {
                event += "Control de acceso "
                message += "Lector de tarjetas " + if (Random().nextBool()) { "Normal" } else { "Falla" }
            } else if (input == "2") {
                event += "Parqueadero "
                message += "Cupos disponibles ${Random().nextInt64(1000)}/999"
            } else if (input == "3") {
                event += "Videovigilancia "
                message += "Cámara " + if (Random().nextBool()) { "En línea" } else { "Fuera de línea" }
            } else if (input == "4") {
                event += "Cuarto de servidores "
                message += "Temperatura ${(25.0 + Random().nextFloat64()).format(".1")}°C"   
                message += " Humedad ${(50.0 + Random().nextFloat64()).format(".1")}%"       
            } else if (input == "5") {
                println("¡Ejecución finalizada!")
                break                                                    
            } else {
                println("¡Opción inválida, seleccione de nuevo!")
                continue                                                  
            }

            let logger = SimpleLogger(file)
            logger.info(event + message)
            println(event + message + " guardado en log.txt")
        } catch (e: Exception) {
            println("Excepción del sistema: ${e}")
            break
        } finally {
            println("")
        }
    }
    return 0
}