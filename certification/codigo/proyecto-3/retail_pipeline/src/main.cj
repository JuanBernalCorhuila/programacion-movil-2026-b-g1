package retail_pipeline
// Dependencias de la biblioteca estándar para colecciones, archivos, ordenamiento
// y medición de tiempo.
import std.collection.*
import std.convert.*
import std.env.*
import std.fs.*
import std.io.*
import std.sort.*
import std.time.*

// Una transacción almacena sus datos identificadores, región, cantidades,
// montos y estado.
type TradeType = (String, Int64, String, String, String, String, Float64, Int64, Float64, Bool)
let rawdata = ArrayList<TradeType>()

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

// Lectura por flujo, línea por línea, sin cargar todo el archivo en memoria.
// El try-with-resources cierra el archivo automáticamente.
func readTradeFile(filename: String): Bool {
    var ok = true
    try (fileStream = File(filename, OpenMode.Read)) {
        let startTime = DateTime.now()
        println("Reading file...")
        let reader = StringReader(fileStream)
        if (reader.readln().isNone()) { // encabezado
            ok = false
        } else {
            parseLine(reader)
            let usedTime = DateTime.now() - startTime
            println("A total of ${rawdata.size} records were parsed, using ${usedTime} time")
        }
    } catch (e: Exception) {
        println("Failed to read file: ${e.message}")
        ok = false
    }
    return ok
}

func parseLine(reader: StringReader<File>): Unit {
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
        } catch (e: Exception) {
            println("Error parsing data row: ${line}, Error: ${e.message}")
        }
        line = reader.readln()
    }
}

// Filtro de orden superior: conserva solo los pagos exitosos.
let trade_success_filter = filter<TradeType>({ trade => trade[9] })

// Una sola función de orden superior arma las tres estadísticas;
// solo cambia cómo se obtiene la clave (región, producto o mes).
func summarizeBy(keyOf: (TradeType) -> String): (Iterator<TradeType>) -> ArrayList<(String, Int64, Float64)> {
    return { trades: Iterator<TradeType> =>
        let totals = HashMap<String, (Int64, Float64)>()
        for (t in trades) {
            let key = keyOf(t)
            if (totals.contains(key)) {
                let current = totals[key]
                totals[key] = (current[0] + t[7], current[1] + t[8])
            } else {
                totals[key] = (t[7], t[8])
            }
        }
        let result = ArrayList<(String, Int64, Float64)>()
        for ((key, v) in totals) {
            result.add((key, v[0], v[1]))
        }
        result
    }
}

let analysis_by_location = summarizeBy({ t => t[2] })
let analysis_by_good = summarizeBy({ t => t[5] })
// El mes sale de la fecha "aaaa-mm-dd": se toman año y mes.
let analysis_by_month = summarizeBy({ t =>
    let parts = t[0].split("-")
    "${parts[0]}-${parts[1]}"
})

// Orden descendente por monto total (la bandera descending se encarga de invertir).
let sortFun: (ArrayList<(String, Int64, Float64)>) -> Array<(String, Int64, Float64)> = { analysisRes =>
    let resArr = analysisRes.toArray()
    sort<(String, Int64, Float64)>(resArr, by: { a, b =>
        if (a[2] < b[2]) {
            Ordering.LT
        } else if (a[2] > b[2]) {
            Ordering.GT
        } else {
            Ordering.EQ
        }
    }, stable: true, descending: true)
    resArr
}

// Impresión con barras proporcionales al máximo (hasta 40 bloques).
let printResult: (Array<(String, Int64, Float64)>) -> Unit = { analysis =>
    println("====== Transaction Information Statistics ======")
    let maxTotal = if (analysis.size > 0) { analysis[0][2] } else { 0.0 }
    for (element in analysis) {
        let length = if (maxTotal > 0.0) { Int64(element[2] / maxTotal * 40.0) } else { 0 }
        let bar = "█" * length
        println("${element[0]}\tSales: ${element[1]}\tTotal: ${money(element[2])} Yuan\t${bar}")
    }
}

// Tubería funcional: datos -> filtro de éxitos -> estadística -> orden -> impresión.
func runReport(analysis: (Iterator<TradeType>) -> ArrayList<(String, Int64, Float64)>): Unit {
    rawdata.iterator() |> trade_success_filter |> analysis |> sortFun |> printResult
}

main() {
    // Se carga el archivo por flujo antes de mostrar el menú.
    if (readTradeFile("./smart_retail_sales.csv")) {
        println("Data read successfully, number of records read: ${rawdata.size}.")
    } else {
        println("Data read failed.")
        return
    }
    while (true) {
        println("======Batch Data Processing System=======")
        println("Main menu: [1] Statistics by region [2] Statistics by product [3] Statistics by month [4] Exit")
        let order = getStdIn().readln() ?? ""
        match (order) {
            case "1" => runReport(analysis_by_location)
            case "2" => runReport(analysis_by_good)
            case "3" => runReport(analysis_by_month)
            case "4" => break
            case _ => println("Command input error, please re-enter!")
        }
    }
}