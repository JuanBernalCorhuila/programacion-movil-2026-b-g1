Planificación del Proyecto Móvil
Project pitch
Many local bar and pub owners struggle to maintain real-time control over their beverage inventory, leading to stockouts and lost revenue during peak hours. This mobile application is designed specifically for bar managers and inventory staff who need an efficient, fast, and portable way to track stock. The Minimum Viable Product (MVP) focuses on displaying real-time stock levels, allowing instant manual inventory adjustments, and sending low-stock alerts. By digitizing inventory management on mobile devices, business owners can reduce waste and optimize their purchasing workflow. Ultimately, this solution simplifies daily operations and ensures seamless service for customers.

Definición de la Idea del Proyecto

Problema: Los bares y discotecas locales sufren desabastecimiento inesperado o pérdidas de mercancía durante momentos de alta afluencia debido al control manual o en papel de su inventario.

Público Objetivo: Administradores, bartenders y personal de logística de bares y gastronómicos.

MVP (3 funciones imprescindibles):

Visualización de inventario en tiempo real: Lista interactiva de productos con stock actual, categoría y precio.

Registro rápido de entradas y salidas: Botones de ajuste directo (+ / -) para actualizar stock desde el celular en segundos.

Sistema de alertas de stock crítico: Notificaciones automáticas cuando un producto está por debajo del límite mínimo configurado.

Historias de Usuario y Backlog Priorizado

Historias de Usuario

HU01: Ver catálogo de productos

Descripción: Como administrador, quiero ver la lista completa de bebidas y productos para conocer el stock disponible.

Criterios de Aceptación: Debe mostrar imagen, nombre, categoría y cantidad actual. Debe cargar los datos de forma fluida en el dispositivo móvil.

HU02: Actualizar stock de un producto

Descripción: Como bartender, quiero aumentar o disminuir la cantidad de un producto rápidamente para registrar el consumo.

Criterios de Aceptación: Interfaz con botones táctiles de incremento y decremento. El nuevo valor debe actualizarse inmediatamente en la pantalla.

HU03: Recibir alerta de stock bajo

Descripción: Como encargado de compras, quiero recibir un aviso visual cuando un producto esté por agotarse para reabastecerlo a tiempo.

Criterios de Aceptación: Los productos con stock menor a 5 unidades se resaltan en color rojo. Se muestra un indicador de advertencia prioritario.

HU04: Filtrar productos por categoría

Descripción: Como usuario, quiero filtrar el inventario por categorías (cervezas, licores, snacks) para encontrar un producto rápido.

Criterios de Aceptación: Filtros accesibles en la parte superior. La lista se actualiza al instante al seleccionar una categoría.

HU05: Buscar producto por nombre

Descripción: Como usuario, quiero un buscador de texto para ubicar una bebida específica sin desplazarme por toda la lista.

Criterios de Aceptación: Barra de búsqueda funcional en tiempo real. Mensaje claro si no se encuentran coincidencias.

HU06: Registrar nuevo producto

Descripción: Como administrador, quiero agregar un nuevo producto al sistema desde el móvil con su stock inicial.

Criterios de Aceptación: Formulario con validación de campos obligatorios (nombre, precio, cantidad inicial). Guardado exitoso y actualización del catálogo.

Backlog Priorizado (Sprints)

Sprint 1 (MVP Base): HU01, HU02 -> Objetivo: Implementar la vista del catálogo e interacción básica de ajuste de stock.
Sprint 2 (Alertas y Búsqueda): HU03, HU05 -> Objetivo: Agregar indicadores de stock crítico y la barra de búsqueda rápida.
Sprint 3 (Gestión Avanzada): HU04, HU06 -> Objetivo: Incorporar filtros por categoría y el formulario para añadir nuevos productos.

Tipo de App y Metodología

Tipo de App: Híbrida / Multiplataforma (React Native / Expo o Flutter).
Justificación: Permite desarrollar una sola base de código ejecutable tanto en Android como en iOS, reduciendo tiempos y costos de desarrollo. Además, ofrece un rendimiento nativo ideal para aplicaciones de gestión con interfaz fluida.

Metodología: Scrum (Ágil).
Justificación: Al estructurar el desarrollo en Sprints de ciclo corto, se permite validar cada función del MVP con retroalimentación continua del usuario final, adaptándose rápidamente a cambios o nuevos requerimientos de los bares.