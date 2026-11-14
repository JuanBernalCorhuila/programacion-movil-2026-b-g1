# Certificación · Cangjie Programming (Huawei ICT Academy)

Programación Móvil · Corte 3 · 2026-B · CORHUILA

## Ficha

| Dato | Detalle |
|---|---|
| Nombre completo | Juan Camilo Bernal Gordillo |
| Usuario de GitHub | [JuanBernalCorhuila](https://github.com/JuanBernalCorhuila) |
| Curso | Cangjie Programming |
| Enlace | [Huawei ICT Academy – Cangjie Programming](https://e.huawei.com/en/talent/ict-academy/#/ict-courses-detail?courseId=fvXQlvE-whPqVon6TmjmbXFGBmk) |
| Duración publicada | 56 horas |
| Fecha de inicio | 30/10/2026 |
| Fecha de finalización | 13/11/2026 |
| Nota del examen final | 75 / 100 (aprobado) |

> **Nota sobre la evidencia 00:** la captura se tomó el 30/10/2026, el mismo día de la inscripción. En ese momento la ficha del curso en Huawei Talent no mostraba el estado de inscripción ni el porcentaje de avance; solo el botón *To Study*. Esto se debió a la plataforma: la asociación como estudiante de CORHUILA quedó pendiente de aprobación y se aprobó ese mismo día, y el curso apareció después en *My Course* con 0 % de avance. La situación se consultó con el docente, quien confirmó que la evidencia es válida.

## Desarrollo del curso

| Etapa | Fecha de finalización | Lo aprendido | Evidencia | Código |
|---|---|---|---|---|
| Project 1 – Setting Up The Work Environment | 05/11/2026 | Instalé el SDK de Cangjie y entendí que trae el compilador `cjc` y el gestor `cjpm`, y que el entorno se configura con `CANGJIE_HOME` y el Path. CodeArts requiere cuenta de China y el plugin de Cangjie para DevEco ya no está disponible, y en mi Windows `cjpm` fallaba (error 0xC0000005), así que trabajé en Ubuntu con WSL y VS Code remoto. Compilé con `cjc` y con `cjpm`, y vi que `cjpm` llama a `cjc` y genera `target`. También importé la librería `stdx` para montar un servidor HTTP. | [01-proyecto-1.png](evidencias/01-proyecto-1.png) | [codigo/proyecto-1](codigo/proyecto-1/) |
| Project 2 – Log File Management | 10/11/2026 | Usé tipos de datos (String, Int64, Float64, Bool) para leer información por consola y registrarla con el logger de stdx. Con if/else if, while, break, continue y try-with-resources guardé datos en tiempo real en log.txt sin perder registros. Luego filtré el log por nivel con funciones sobrecargadas y una lambda como callback. Corregí errores del código del libro, como un archivo sin declarar y un bucle sin salida. | [02-proyecto-2.png](evidencias/02-proyecto-2.png) | [codigo/proyecto-2](codigo/proyecto-2/) |
| Project 3 – System Data Analysis | 12/11/2026 | Con enums y `match` validé la entrada de datos, y con `Option` y excepciones evité que el programa fallara con datos vacíos o inválidos. Usé ArrayList, HashSet, HashMap y tuplas para procesar datos por lote: un menú para agregar, eliminar, modificar y consultar dispositivos sin repetir IDs. Leí un CSV de transacciones, lo limpié (faltantes, duplicados y pagos fallidos) y calculé las ventas por región, producto, mes y año, ordenadas de mayor a menor y con barras. Con funciones de orden superior y el operador `\|>` armé una sola función que sirve para todas las estadísticas. Corregí errores del libro, como agrupaciones que duplicaban totales y un orden que salía invertido. | [03-proyecto-3.png](evidencias/03-proyecto-3.png) | [codigo/proyecto-3](codigo/proyecto-3/) |
| Project 4 – Business Function Optimization | 13/11/2026 | Usé clases, herencia y una clase abstracta `Device` con subclases (sensor, purificador de aire, báscula, aire acondicionado, cortina e iluminación), donde cada una sobrescribe con `override` su propio menú de control. Con interfaces, enums, propiedades y un singleton organicé los dispositivos y las habitaciones, y con genéricos armé una función de lectura de datos reutilizable. Conecté Cangjie con C usando `foreign func` para limpiar la pantalla. En el Work Order uní todo en un solo programa con modo lista de dispositivos y modo lista de habitaciones, y manejé los errores con excepciones y reintentos de entrada. Corregí errores del libro, como el comando de limpieza de pantalla de Windows, que adapté a Linux. | [04-proyecto-4.png](evidencias/04-proyecto-4.png) | [codigo/proyecto-4](codigo/proyecto-4/) |
| Examen final | 13/11/2026 | Presenté el examen final de Cangjie Programming, con preguntas de verdadero o falso, de única respuesta y de respuesta múltiple (5 de cada tipo), y lo aprobé con 75 de 100 puntos en 1 h 19 min. Obtuve 20/25 en verdadero o falso, 15/25 en única respuesta y 40/50 en respuesta múltiple. Me sirvió para repasar lo que usé en los proyectos: sintaxis, clases, genéricos e interoperabilidad con C. | [05-examen-final.png](evidencias/05-examen-final.png) | — |

> **Nota sobre el avance:** el Project 1 lo hice task por task (lectura, cuestionario e implementación). Para los Projects 2, 3 y 4 cambié de estrategia: entre el 6 y el 8 de noviembre leí todas sus tasks y resolví los cuestionarios en la plataforma, sin implementar todavía. Después, en días distintos, hice en cada proyecto las implementaciones de sus tasks y el Practical Training Work Order: el Project 2 el 10/11, el Project 3 entre el 11/11 y el 12/11 y el Project 4 el 13/11.

> **Nota sobre el código del Project 1:** las Tasks 1.1 (CodeArts) y 1.3 (DevEco Studio) no tienen carpeta de código. CodeArts solo se puede usar con una cuenta de Huawei Cloud de China, y el plugin de Cangjie para DevEco ya no está en el centro de descargas internacional, así que en la 1.1 solo instalé el SDK y en la 1.3 estudié el flujo de desarrollo y busqué el plugin sin éxito. El código del Project 1 corresponde a la Task 1.2 (`demo`), la Task 1.4 (`cangjie_demo`, `cjpm_demo` y `stdx_demo`) y el Practical Training Work Order (`cangjie`).

> **Nota sobre los datos del Project 3:** la plataforma no entrega el archivo `smart_retail_sales.csv` que usa la Task 3.3 (el libro solo indica que tiene 122.120 registros). Por eso generé mis propios CSV con el mismo formato de 10 columnas, con un script `gen_csv.py` en cada carpeta de código. Las regiones son zonas de Neiva y, en el Work Order, agregué registros vacíos y duplicados para probar la limpieza.

> **Nota sobre el código del Project 4:** el libro usa `chcp65001` y comandos de Windows para limpiar la pantalla; como trabajé en WSL, los cambié por una función en C (`ffi/program.c`, con `system("clear")`) que llamo con `foreign func` y compilo con `compile-option` en `cjpm.toml`. Las carpetas `ac_manager`, `smart_devices` y `smart_home` corresponden a las Tasks 4.1, 4.2 y 4.3, y `smart_home_system` al Practical Training Work Order. En el Work Order ya no usé `trim` porque `String` no lo trae en Cangjie 1.0.5.

> **Nota sobre la hora del examen:** la plataforma de Huawei muestra la hora de China (UTC+8). Por eso el examen aparece del 14/11/2026 de 10:45:50 a 12:05:46, que en Colombia fue del 13/11/2026 de 9:45 p. m. a 11:05 p. m. En la captura, el reloj de mi computador marca las 23:05 del 13/11/2026.

## Relación con la asignatura

Al principio Programación Móvil me pareció complicada: eran muchas cosas nuevas a la vez, como planificar un MVP, escribir requerimientos e historias de usuario, montar el entorno con Node e Ionic y después pasar a las pantallas, el backend con Express, los tokens y el manejo de la conectividad. Lo que más disfruté fue desarrollar mi propia app, HelpHealth, con Ionic React, porque ver las pantallas funcionando me hizo entender para qué servía todo lo anterior. Cangjie me sirvió para ver lo mismo desde otro lenguaje: se parece a TypeScript en el tipado estático, las clases, las interfaces, los genéricos y el try/catch, aunque en vez de `undefined` y `null` usa `Option` y el operador `??`, algo que me recordó la seguridad ante null de Kotlin que vimos en clase. Las funciones de orden superior como `filter` y `|>` se parecen al `map` y `filter` de los arrays que uso en React. Además, Cangjie es el lenguaje que Huawei propone para HarmonyOS, así que es otro camino hacia lo mismo que hago en la asignatura: apps móviles. Aprender los dos me ayudó a entender mejor cada uno, y hoy me siento más seguro programando para móvil que cuando empecé el curso.
