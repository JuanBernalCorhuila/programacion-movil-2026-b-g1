package smart_devices

import std.env.*
import smart_devices.model.*

// Función en C (ffi/program.c) para limpiar la pantalla.
foreign func clearScreen(): Unit

// Los tres dispositivos del sistema.
let sensor = SensorDevice(1001, "My temperature and humidity sensor")
let airPurifier = AirPurifierDevice(1002, "My air purifier")
let bodyFatScale = BodyFatScaleDevice(1003, "My body fat scale")

// Pausa para alcanzar a leer antes de limpiar la pantalla.
func pause(message: String) {
    println(message)
    let _ = getStdIn().readln()
}

func fmt1(x: Float64): String {
    let tenths = Int64(x * 10.0 + 0.5)
    return "${tenths / 10}.${tenths % 10}"
}

// Panel del sensor de temperatura y humedad.
func operateSensor() {
    while (true) {
        unsafe { clearScreen() }
        sensor.displayStatues()
        println("Operation: [1] Connect/Disconnect [2] Update [3] Return")
        let order = getStdIn().readln() ?? ""
        match (order) {
            case "1" =>
                if (sensor.online) {
                    sensor.disconnect()
                } else {
                    sensor.connect()
                }
            case "2" => sensor.update()
            case "3" => break
            case _ => pause("Invalid command input, please try again! Press Enter to continue.")
        }
    }
}

// Panel del purificador de aire.
func operateAirPurifier() {
    while (true) {
        unsafe { clearScreen() }
        airPurifier.displayStatues()
        println("Operation: [1] Connect/Disconnect [2] Power [3] Update [4] Return")
        let order = getStdIn().readln() ?? ""
        match (order) {
            case "1" =>
                if (airPurifier.online) {
                    airPurifier.disconnect()
                } else {
                    airPurifier.connect()
                }
            case "2" => airPurifier.togglePower()
            case "3" => airPurifier.update()
            case "4" => break
            case _ => pause("Invalid command input, please try again! Press Enter to continue.")
        }
    }
}

// Panel de la báscula de grasa corporal.
func operateBodyFatScale() {
    while (true) {
        unsafe { clearScreen() }
        bodyFatScale.displayStatues()
        println("Operation: [1] Connect/Disconnect [2] Measure [3] Return")
        let order = getStdIn().readln() ?? ""
        match (order) {
            case "1" =>
                if (bodyFatScale.online) {
                    bodyFatScale.disconnect()
                } else {
                    bodyFatScale.connect()
                }
            case "2" =>
                let result = bodyFatScale.measure()
                if (result[0].isNone()) {
                    pause("The scale is offline, connect it first. Press Enter to continue.")
                } else {
                    pause("Measurement result: Weight: ${fmt1(result[0] ?? 0.0)}kg, BMI: ${fmt1(result[1] ?? 0.0)}kg/m². Press Enter to continue.")
                }
            case "3" => break
            case _ => pause("Invalid command input, please try again! Press Enter to continue.")
        }
    }
}

main(): Int64 {
    // Encender y conectar los dispositivos al iniciar.
    sensor.connect()
    airPurifier.open()
    airPurifier.connect()
    bodyFatScale.connect()

    while (true) {
        unsafe { clearScreen() }
        println("====== Smart Device Management Software ======")
        sensor.displayStatues()
        airPurifier.displayStatues()
        bodyFatScale.displayStatues()
        println("Select device: [1] Temperature and humidity sensor [2] Air purifier [3] Body fat scale [4] Exit software")
        let order = getStdIn().readln() ?? ""
        match (order) {
            case "1" => operateSensor()
            case "2" => operateAirPurifier()
            case "3" => operateBodyFatScale()
            case "4" => break
            case _ => pause("Command input error, please re-enter! Press Enter to continue.")
        }
    }
    return 0
}