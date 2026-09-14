# Semana 7 - Kotlin básico y componente Ionic

## Contenido
- `Producto.kt`: clase en Kotlin con validación y manejo de nulos.
- `Saludo.tsx`: componente en Ionic React que muestra un nombre y un botón.

## Diferencias entre Kotlin y TypeScript

**1. Manejo de nulos**
En Kotlin, una variable normal nunca puede ser null a menos que uno lo permita explícitamente poniendo un `?` después del tipo (por ejemplo `String?`). Esto hace que el compilador obligue a revisar si algo puede ser null antes de usarlo. En TypeScript, por defecto una variable sí puede ser `null` o `undefined`, y aunque se puede activar una opción más estricta, no es tan automática como en Kotlin.

**2. Variables inmutables**
En Kotlin se usa `val` para una variable que no cambia y `var` para una que sí puede cambiar. En TypeScript se usa `const` para lo que no cambia y `let` para lo que sí. La idea es parecida en los dos lenguajes, pero en Kotlin el uso de `val` es más recomendado por defecto y ayuda a evitar errores.
