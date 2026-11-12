package data_analysis
// Dependencias de la biblioteca estándar para colecciones, archivos, análisis
// y medición de tiempo.
import std.collection.*
import std.convert.*
import std.env.*
import std.fs.*
import std.io.*
import std.time.*

// Una transacción almacena sus datos identificadores, región, cantidades,
// montos y estado.
type TradeType = (String, Int64, String, String, String, String, Float64, Int64, Float64, Bool)

let rawdata = ArrayList<TradeType>()
let trades = ArrayList<TradeType>()

main() {
    // Cargar los datos de origen antes de mostrar las opciones de análisis.
    let csvFilename = "./smart_retail_sales.csv"
    if (readTradeFile(csvFilename)) {
        println("Data read successfully, number of records read: ${rawdata.size}.")
    } else {
        println("Data read failed.")
        return
    }
    // Menú con las opciones [1][2][3][4].
    while (true) {
        println("======Batch Data Processing System=======")
        println("Function menu: [1] Data Display [2] Data Cleaning [3] Data Statistics (by Region) [4] Exit")
        let order = getStdIn().readln() ?? ""
        match (order) {
            case "1" => showSomeData()
            case "2" => filterByPayStatus()
            case "3" => analysisByRegion()
            case "4" => break
            case _ => println("Command input error, please re-enter!")
        }
    }
}

// Da formato de dos decimales a un Float64 no negativo (22.5 -> "22.50").
func money(x: Float64): String {
    let cents = Int64(x * 100.0 + 0.5)
    let rest = cents % 100
    let restStr = if (rest < 10) { "0${rest}" } else { "${rest}" }
    return "${cents / 100}.${restStr}"
}

func safeParseInt64(str: String, defaultValue!: Int64 = 0): Int64 {
    try {
        Int64.parse(str)
    } catch (e: Exception) {
        defaultValue
    }
}

func safeParseFloat64(str: String, defaultValue!: Float64 = 0.0): Float64 {
    try {
        Float64.parse(str)
    } catch (e: Exception) {
        defaultValue
    }
}

func readTradeFile(filename: String): Bool {
    // File.readFrom administra el recurso del archivo; no se necesita cerrarlo
    // manualmente. Los errores se informan dentro de try/catch.
    var ok = true
    try {
        println("Reading file...")
        let bytes = File.readFrom(filename)
        // Se mide la duración del análisis con DateTime.now() antes y después.
        let startTime = DateTime.now()
        let count = parseLine(bytes)
        let usedTime = DateTime.now() - startTime
        println("--Parsed ${count} records in total, time used: ${usedTime}")
    } catch (e: Exception) {
        println("Failed to read file: ${e.message}")
        ok = false
    }
    return ok
}

func parseLine(bytes: Array<Byte>): Int64 {
    // Ignorar el encabezado, validar la cantidad esperada de columnas y usar
    // un análisis numérico seguro antes de agregar una transacción válida.
    // El último campo indica éxito únicamente cuando su valor es "Success".
    let buffer = ByteBuffer()
    buffer.write(bytes)
    let reader = StringReader(buffer)
    if (reader.readln().isNone()) {
        return 0
    }
    var count = 0
    var line = reader.readln()
    while (line.isSome()) {
        try {
            let lineStr = line.getOrThrow()
            let fields = lineStr.split(",")
            if (fields.size < 10) {
                throw Exception("Insufficient number of fields")
            }
            let id = safeParseInt64(fields[1])
            let price = safeParseFloat64(fields[6])
            let qty = safeParseInt64(fields[7])
            let total = safeParseFloat64(fields[8])
            let paid = fields[9] == "Success"
            rawdata.add((fields[0], id, fields[2], fields[3], fields[4], fields[5], price, qty, total, paid))
            count++
        } catch (e: Exception) {
            println("Error parsing data row: ${line}, Error: ${e.message}")
        }
        line = reader.readln()
    }
    return count
}

func showSomeData() {
    // Se mantiene segura la vista previa cuando hay menos de cinco registros.
    println("Date\tMachine\tRegion\tTime\tProduct ID\tProduct\tPrice\tQty\tTotal\tPaid")
    let limit = if (rawdata.size < 5) { rawdata.size } else { 5 }
    for (i in 0..limit) {
        let t = rawdata[i]
        println("${t[0]}\t${t[1]}\t${t[2]}\t${t[3]}\t${t[4]}\t${t[5]}\t${money(t[6])}\t${t[7]}\t${money(t[8])}\t${t[9]}")
    }
}

func filterByPayStatus() {
    // Limpiar el resultado anterior para evitar duplicar las transacciones
    // exitosas al ejecutar el filtro nuevamente.
    trades.clear()

    // Se cuentan los registros totales, exitosos y fallidos; después se agregan
    // los registros exitosos a trades.
    var successCount = 0
    var failedCount = 0
    for (data in rawdata) {
        if (data[9]) {
            successCount++
            trades.add(data)
        } else {
            failedCount++
        }
    }
    println("Total transactions: ${rawdata.size} Successful: ${successCount} Failed: ${failedCount}")
}

func tradesByRegion(): HashMap<String, (Int64, Float64)> {
    let result = HashMap<String, (Int64, Float64)>()

    for (t in trades) {
        // Agrupar por región y acumular la cantidad y el monto de cada entrada:
        // si result contiene t[2], se actualizan sus totales; de lo contrario,
        // se inserta un nuevo par (cantidad, monto).
        let region = t[2]
        if (result.contains(region)) {
            let current = result[region]
            result[region] = (current[0] + t[7], current[1] + t[8])
        } else {
            result[region] = (t[7], t[8])
        }
    }

    return result
}

func analysisByRegion() {
    if (trades.size == 0) { println("Please clean the data first (option 2)"); return }

    // Convertir los datos agrupados en una lista para ordenarlos y mostrarlos.
    let grouped = tradesByRegion()
    let list = ArrayList<(String, Int64, Float64)>()
    for ((region, totals) in grouped) {
        list.add((region, totals[0], totals[1]))
    }

    // Ordenar por monto total descendente; el ordenamiento por selección
    // evita problemas con la API.
    for (i in 0..list.size) {
        var maxIdx = i
        for (j in (i + 1)..list.size) {
            if (list[j][2] > list[maxIdx][2]) {
                maxIdx = j
            }
        }
        if (maxIdx != i) {
            let tmp = list[i]
            list[i] = list[maxIdx]
            list[maxIdx] = tmp
        }
    }

    // Mostrar la región, las ventas, el total y una barra escalada al
    // máximo (de hasta 40 bloques).
    println("======Transaction Information by Region======")
    let maxTotal = list[0][2]
    for (item in list) {
        let length = if (maxTotal > 0.0) { Int64(item[2] / maxTotal * 40.0) } else { 0 }
        let bar = "█" * length
        println("${item[0]}\tSales: ${item[1]}\tTotal: ${money(item[2])} RMB\t${bar}")
    }
}