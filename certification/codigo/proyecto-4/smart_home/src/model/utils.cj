package smart_home.model

import std.convert.*
import std.env.*

// Función en C (ffi/program.c) para limpiar la pantalla.
foreign func clearScreen(): Unit

public func clearConsole() {
    unsafe { clearScreen() }
}

// Pausa para alcanzar a leer antes de limpiar la pantalla.
public func pause(message: String) {
    println(message)
    let _ = getStdIn().readln()
}

// Un decimal sin depender de std.format (22.46 -> "22.5").
public func fmt1(x: Float64): String {
    let tenths = Int64(x * 10.0 + 0.5)
    return "${tenths / 10}.${tenths % 10}"
}

// Mantiene un valor simulado dentro de un rango razonable.
func clamp(x: Float64, low: Float64, high: Float64): Float64 {
    if (x < low) {
        return low
    }
    if (x > high) {
        return high
    }
    return x
}

// Clase utilitaria con funciones genéricas de entrada validada.
public class Utils {
    // Lee una entrada y la convierte al tipo T; hasta 3 intentos.
    public static func inputInfo<T>(): T where T <: Parsable<T> {
        var retryNum = 3
        while (retryNum != 0) {
            let input = getStdIn().readln() ?? ""
            let value = T.tryParse(input)
            if (value.isSome()) {
                return value.getOrThrow()
            } else {
                print("Input error, please re-enter: ")
            }
            retryNum--
        }
        throw Exception("Input error exceeded 3 times, entry cancelled!")
    }

    // Igual, pero además el valor debe estar entre min y max (inclusive).
    public static func inputInfo<T>(min: T, max: T): T where T <: Parsable<T> & Comparable<T> {
        var retryNum = 3
        while (retryNum != 0) {
            let input = getStdIn().readln() ?? ""
            let value = T.tryParse(input)
            if (value.isSome()) {
                let number = value.getOrThrow()
                if (number < min || number > max) {
                    print("Value out of range, please re-enter: ")
                    retryNum--
                    continue
                }
                return number
            } else {
                print("Input error, please re-enter: ")
                retryNum--
            }
        }
        throw Exception("Input error exceeded 3 times, entry cancelled!")
    }
}