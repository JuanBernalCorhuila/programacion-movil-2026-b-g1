package smart_home_system

import std.console.*
import std.convert.*
import std.math.*

foreign func clearScreen(): Unit

func clearConsole(): Unit {
    unsafe { clearScreen() }
}

func readText(prompt: String): String {
    print(prompt)
    var text = ""
    match (Console.stdIn.readln()) {
        case Some(s) => text = s
        case None => text = ""
    }
    return text
}

func readNonEmpty(prompt: String): String {
    var attempts = 0
    while (attempts < 3) {
        let text = readText(prompt)
        if (text.size > 0) {
            return text
        }
        println("  This field cannot be empty.")
        attempts += 1
    }
    throw Exception("Too many invalid attempts.")
}

func readInt(prompt: String, lo: Int64, hi: Int64): Int64 {
    var attempts = 0
    while (attempts < 3) {
        let text = readText(prompt)
        try {
            let v = Int64.parse(text)
            if (v >= lo && v <= hi) {
                return v
            }
            println("  Value must be between ${lo} and ${hi}.")
        } catch (e: Exception) {
            println("  Invalid number, try again.")
        }
        attempts += 1
    }
    throw Exception("Too many invalid attempts.")
}

func pause(): Unit {
    let _ = readText("Press Enter to continue...")
}

func pad(s: String, n: Int64): String {
    var r = s
    while (r.size < n) {
        r = r + " "
    }
    return r
}

func fmt1(v: Float64): String {
    let t = Int64(round(v * 10.0))
    var neg = ""
    var a = t
    if (t < 0) {
        neg = "-"
        a = -t
    }
    return "${neg}${a / 10}.${a % 10}"
}