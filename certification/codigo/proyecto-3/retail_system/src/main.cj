package retail_system
// Dependencias de la biblioteca estándar para colecciones, archivos y ordenamiento.
import std.collection.*
import std.convert.*
import std.env.*
import std.fs.*
import std.io.*
import std.sort.*

// Una transacción limpia: fecha, máquina, región, hora, ID de producto,
// producto, precio, cantidad, monto y estado.
type TradeType = (String, Int64, String, String, String, String, Float64, Int64, Float64, Bool)

let rawRows = ArrayList<Array<String>>() // filas tal como vienen del archivo
let trades = ArrayList<TradeType>()      // transacciones ya limpias
var cleaned = false

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

// ---------- Módulo 1: lectura de archivo ----------
func readModule() {
    println("Enter the file path (press Enter for ./smart_retail_sales.csv):")
    let input = getStdIn().readln() ?? ""
    let path = if (input.isEmpty()) { "./smart_retail_sales.csv" } else { input }
    rawRows.clear()
    trades.clear()
    cleaned = false
    try (fileStream = File(path, OpenMode.Read)) {
        let reader = StringReader(fileStream)
        if (reader.readln().isNone()) { // encabezado
            println("The file is empty.")
        } else {
            var line = reader.readln()
            while (line.isSome()) {
                rawRows.add(line.getOrThrow().split(","))
                line = reader.readln()
            }
            println("File read successfully: ${rawRows.size} rows loaded from ${path}")
        }
    } catch (e: Exception) {
        println("Failed to read file: ${e.message}")
    }
}

// ---------- Módulo 2: limpieza de datos ----------
func cleanModule() {
    if (rawRows.size == 0) {
        println("Please read a file first (option 1)")
        return
    }
    trades.clear()
    let seen = HashSet<String>()
    var missing = 0
    var duplicated = 0
    var failed = 0
    for (row in rawRows) {
        // 1) datos faltantes: menos de 10 campos o algún campo vacío
        var hasMissing = row.size < 10
        if (!hasMissing) {
            for (field in row) {
                if (field.isEmpty()) {
                    hasMissing = true
                }
            }
        }
        if (hasMissing) {
            missing++
            continue
        }
        // 2) registros duplicados: la misma fila completa ya vista
        var key = ""
        for (field in row) {
            key = key + field + ","
        }
        if (seen.contains(key)) {
            duplicated++
            continue
        }
        seen.add(key)
        // 3) transacciones fallidas
        if (row[9] != "Success") {
            failed++
            continue
        }
        trades.add((row[0], safeParseInt64(row[1]), row[2], row[3], row[4], row[5],
            safeParseFloat64(row[6]), safeParseInt64(row[7]), safeParseFloat64(row[8]), true))
    }
    cleaned = true
    println("====== Data cleaning results ======")
    println("Rows read:                ${rawRows.size}")
    println("Removed (missing data):   ${missing}")
    println("Removed (duplicates):     ${duplicated}")
    println("Removed (failed payment): ${failed}")
    println("Valid transactions kept:  ${trades.size}")
}

// ---------- Estadísticas con funciones de orden superior (Task 3.4) ----------
// Una sola función arma todas las estadísticas; solo cambia la clave de agrupación.
func summarizeBy(keyOf: (TradeType) -> String): (Iterator<TradeType>) -> ArrayList<(String, Int64, Float64)> {
    return { items: Iterator<TradeType> =>
        let totals = HashMap<String, (Int64, Float64)>()
        for (t in items) {
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

let analysis_by_year = summarizeBy({ t => t[0].split("-")[0] })
let analysis_by_month = summarizeBy({ t =>
    let parts = t[0].split("-")
    "${parts[0]}-${parts[1]}"
})
let analysis_by_location = summarizeBy({ t => t[2] })
let analysis_by_good = summarizeBy({ t => t[5] })

// Orden descendente por monto total.
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

// Guarda el resultado ordenado en un archivo CSV.
func saveCsv(fileName: String, header: String, data: Array<(String, Int64, Float64)>) {
    var text = "${header}\n"
    for (row in data) {
        text = text + "${row[0]},${row[1]},${money(row[2])}\n"
    }
    try (out = File(fileName, OpenMode.Write)) {
        out.write(text.toArray())
        println("Results saved in ${fileName}")
    } catch (e: Exception) {
        println("Failed to save ${fileName}: ${e.message}")
    }
}

// Tubería: transacciones -> estadística -> orden -> pantalla y archivo.
func runReport(analysis: (Iterator<TradeType>) -> ArrayList<(String, Int64, Float64)>,
    fileName: String, header: String): Unit {
    let sorted = trades.iterator() |> analysis |> sortFun
    printResult(sorted)
    saveCsv(fileName, header, sorted)
}

// ---------- Módulo 3: análisis de datos ----------
func analysisModule() {
    if (!cleaned) {
        println("Please clean the data first (option 2)")
        return
    }
    while (true) {
        println("------ Data analysis ------")
        println("[1] Annual sales [2] Monthly sales [3] Sales by region [4] Sales by product [5] Back")
        let cmd = getStdIn().readln() ?? ""
        match (cmd) {
            case "1" => runReport(analysis_by_year, "year.csv", "year,sales,total")
            case "2" => runReport(analysis_by_month, "month.csv", "month,sales,total")
            case "3" => runReport(analysis_by_location, "district.csv", "region,sales,total")
            case "4" => runReport(analysis_by_good, "products.csv", "product,sales,total")
            case "5" => break
            case _ => println("Input error, please re-enter!")
        }
    }
}

// ---------- Requisito adicional: detalle de ventas por región ----------
func regionDetail() {
    if (!cleaned) {
        println("Please clean the data first (option 2)")
        return
    }
    println("Enter a region (Norte, Sur, Oriente, Occidente, Centro):")
    let region = getStdIn().readln() ?? ""
    let byRegion = filter<TradeType>({ t => t[2] == region })
    let result = trades.iterator() |> byRegion |> analysis_by_good |> sortFun
    if (result.size == 0) {
        println("No sales found for region '${region}'")
    } else {
        println("Products sold in ${region}:")
        printResult(result)
    }
}

main() {
    while (true) {
        println("======Smart Retail Data Analysis System=======")
        println("Main menu: [1] File reading [2] Data cleaning [3] Data analysis [4] Region detail [5] Exit")
        let order = getStdIn().readln() ?? ""
        match (order) {
            case "1" => readModule()
            case "2" => cleanModule()
            case "3" => analysisModule()
            case "4" => regionDetail()
            case "5" => break
            case _ => println("Command input error, please re-enter!")
        }
    }
}