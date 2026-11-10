package log_analysis

import std.env.*
import std.fs.*
import std.io.*

// Controla el menú principal y dirige cada opción al análisis correspondiente.
main(): Int64 {
    while (true) {
        try (file = File(Path("./log.txt"), Read)) {
            print("Seleccione el nivel de log a filtrar: ")
            println("[1] TRACE [2] DEBUG [3] INFO [4] WARN [5] ERROR [6] Salir")
            let input = getStdIn().readln().getOrThrow()
            if (parseCommand(input, "1", file, "TRACE")) { continue }
            if (parseCommand(input, "2", file, "DEBUG")) { continue }
            if (parseCommand(input, "3", file, "INFO")) { continue }
            if (parseCommand(input, "4", file, "WARN")) { continue }
            if (parseCommand(input, "5", file, "ERROR")) { continue }
            if (parseCommand(input, "6") { println("¡Ejecución finalizada!") }) { break }
            println("¡Opción inválida, seleccione de nuevo!")
        } catch (e: Exception) {
            println("Excepción del sistema: ${e}")
            break
        } finally {
            println("")
        }
    }
    return 0
}

// Filtra el archivo por nivel, imprime las coincidencias y cuenta cuántas encontró.
func parseCommand(input: String, valid: String, file: File, target: String): Bool {
    if (input == valid) {
        var count = 0
        let log = StringReader(file)
        for (line in log.lines() where line.contains(target)) {
            println(line)
            count += 1
        }
        println("Líneas encontradas: ${count}")
        true
    } else {
        false
    }
}

// Sobrecarga que ejecuta un callback cuando la opción seleccionada coincide.
func parseCommand(input: String, valid: String, callback: () -> Unit): Bool {
    if (input == valid) {
        callback()
        true
    } else {
        false
    }
}