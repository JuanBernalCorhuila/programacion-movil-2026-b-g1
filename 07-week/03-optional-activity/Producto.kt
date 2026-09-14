// Producto.kt
// Semana 7 - Programación Móvil
// Clase con val (inmutable), validación de precio >= 0 y manejo de nulos.

class Producto(val nombre: String, val precio: Double?) {

    init {
        // require lanza una excepción si la condición es falsa.
        // Si precio es null, no se valida (se permite "sin precio").
        require(precio == null || precio >= 0) {
            "El precio de \"$nombre\" no puede ser negativo"
        }
    }

    // Función que arma un texto seguro aunque precio sea null
    fun mostrar(): String {
        val precioTexto = precio?.let { "$$it" } ?: "precio no disponible"
        return "Producto: $nombre - $precioTexto"
    }
}

fun main() {
    // Ejemplo 1: producto con precio válido
    val p1 = Producto("Camisa", 45000.0)

    // Ejemplo 2: producto sin precio (null), usando manejo seguro de nulos
    val p2 = Producto("Bufanda", null)

    println(p1.mostrar())
    println(p2.mostrar())

    // Ejemplo de validación fallando (descomentar para probar):
    // val p3 = Producto("Zapatos", -10000.0) // lanza IllegalArgumentException
}
