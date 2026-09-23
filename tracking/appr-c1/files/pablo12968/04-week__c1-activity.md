# 🍦 Ice Cream App

## Planificación del proyecto móvil

**Asignatura:** Programación Móvil  
**Proyecto:** Ice Cream App  
 

---

## 1. Idea de la aplicación

Ice Cream App es una aplicación móvil diseñada para facilitar la compra de helados desde un teléfono celular.

La aplicación permitirá que los clientes se registren e inicien sesión, consulten los helados disponibles, conozcan sus sabores y precios, seleccionen los productos que desean comprar y finalmente confirmen su pedido.

La aplicación estará orientada inicialmente a una heladería local y tendrá una interfaz sencilla, atractiva y fácil de utilizar.

### Problema

Actualmente, muchas pequeñas heladerías realizan sus ventas directamente en el establecimiento o reciben pedidos mediante llamadas o aplicaciones de mensajería.

Esto puede generar dificultades para que los clientes conozcan rápidamente los productos disponibles, sus sabores y precios. Además, los pedidos pueden ser más difíciles de organizar cuando se reciben por diferentes medios.

Ice Cream App busca facilitar este proceso mediante una aplicación móvil en la que el cliente pueda registrarse, consultar el catálogo de helados, seleccionar sus productos y realizar su pedido de manera organizada.

### Público objetivo

La aplicación está dirigida principalmente a:

- Personas que consumen helados.
- Jóvenes y adultos que utilizan teléfonos inteligentes.
- Clientes de una heladería local.
- Personas que desean consultar sabores y precios antes de realizar un pedido.
- Clientes que buscan una forma sencilla de realizar pedidos desde su dispositivo móvil.

---

## 2. MVP - Producto Mínimo Viable

Para la primera versión de Ice Cream App se desarrollarán tres funciones imprescindibles:

### 1. Registro e inicio de sesión

El cliente podrá crear una cuenta proporcionando:

- Nombre.
- Correo electrónico.
- Contraseña.

Posteriormente podrá iniciar sesión utilizando su correo electrónico y contraseña.

### 2. Catálogo y carrito de helados

El usuario podrá consultar los helados disponibles.

Cada producto mostrará:

- Imagen.
- Nombre.
- Sabor.
- Descripción.
- Precio.

El usuario podrá seleccionar los helados que desea comprar y agregarlos al carrito.

### 3. Confirmación del pedido

El usuario podrá revisar los productos agregados al carrito, visualizar las cantidades y conocer el valor total de la compra.

Finalmente podrá confirmar su pedido y la aplicación mostrará un mensaje indicando que el pedido fue realizado correctamente.

> **Nota:** La primera versión no incluirá pagos electrónicos, mapas ni GPS. Estas funciones podrán ser consideradas como mejoras futuras.

---

## 3. Historias de usuario

| ID | Historia de usuario | Criterios de aceptación |
|---|---|---|
| HU01 | Como cliente quiero registrarme en la aplicación para crear una cuenta y acceder a sus funciones. | El sistema debe permitir ingresar nombre, correo y contraseña. Los campos obligatorios deben estar completos para realizar el registro. |
| HU02 | Como usuario registrado quiero iniciar sesión para acceder a la aplicación. | El sistema debe permitir iniciar sesión utilizando un correo y contraseña registrados. |
| HU03 | Como cliente quiero visualizar los helados disponibles para conocer los productos que ofrece la heladería. | La aplicación debe mostrar imagen, nombre, sabor, descripción y precio de los helados disponibles. |
| HU04 | Como cliente quiero agregar helados al carrito para seleccionar los productos que deseo comprar. | Al presionar "Agregar al carrito", el producto seleccionado debe aparecer correctamente en el carrito. |
| HU05 | Como cliente quiero revisar mi carrito para conocer los productos seleccionados y el valor total de mi compra. | El carrito debe mostrar los productos seleccionados, cantidades, precios y valor total del pedido. |
| HU06 | Como cliente quiero confirmar mi pedido para finalizar el proceso de compra. | Al confirmar el pedido, la aplicación debe registrar la solicitud y mostrar un mensaje indicando que el pedido fue realizado correctamente. |

---

## 4. Backlog priorizado

Las seis historias de usuario se organizarán en tres sprints.

### Sprint 1 - Registro y acceso

**Objetivo:** desarrollar el acceso inicial de los usuarios a Ice Cream App.

| Prioridad | Historia | Funcionalidad |
|---|---|---|
| 1 | HU01 | Registro de usuario |
| 2 | HU02 | Inicio de sesión |

**Resultado esperado:** el cliente podrá crear una cuenta e iniciar sesión en la aplicación.

### Sprint 2 - Catálogo y selección de productos

**Objetivo:** permitir que el cliente conozca los productos disponibles y seleccione los helados que desea comprar.

| Prioridad | Historia | Funcionalidad |
|---|---|---|
| 3 | HU03 | Visualizar catálogo de helados |
| 4 | HU04 | Agregar helados al carrito |

**Resultado esperado:** el cliente podrá consultar los productos y agregarlos al carrito.

### Sprint 3 - Carrito y pedido

**Objetivo:** completar el proceso de compra.

| Prioridad | Historia | Funcionalidad |
|---|---|---|
| 5 | HU05 | Revisar carrito y total |
| 6 | HU06 | Confirmar pedido |

**Resultado esperado:** el usuario podrá revisar su compra y confirmar el pedido.

---

## 5. Tipo de aplicación

### Aplicación híbrida

Ice Cream App será una aplicación móvil híbrida desarrollada utilizando **Ionic + React**.

Se selecciona este tipo de aplicación porque permite utilizar tecnologías web para desarrollar una aplicación que posteriormente puede ejecutarse en dispositivos móviles.

Ionic permite crear interfaces adaptadas a teléfonos celulares utilizando tecnologías como HTML, CSS, JavaScript y React.

### Justificación

Una aplicación híbrida es apropiada para este proyecto porque permite trabajar con una única base de código y facilita el desarrollo de una aplicación académica sencilla.

Las funciones principales de Ice Cream App, como registro, inicio de sesión, catálogo, carrito y pedidos, pueden implementarse sin necesidad de desarrollar aplicaciones nativas independientes para diferentes sistemas operativos.

---

## 6. Metodología de desarrollo

### Scrum

Para organizar el desarrollo de Ice Cream App se utilizará la metodología ágil **Scrum**.

### Justificación

Scrum permite dividir el desarrollo del proyecto en pequeñas etapas denominadas sprints.

Esto permitirá desarrollar progresivamente las funciones de la aplicación, revisar los resultados obtenidos y realizar mejoras durante el proceso.

Para este proyecto se plantean tres sprints:

- **Sprint 1:** Registro e inicio de sesión.
- **Sprint 2:** Catálogo y carrito.
- **Sprint 3:** Revisión y confirmación del pedido.

Esta metodología facilita organizar las historias de usuario de acuerdo con su prioridad y mantener un seguimiento del avance del proyecto.

---

## 7. Project Pitch

Ice Cream App is a mobile application designed to simplify the process of ordering ice cream. Many small ice cream shops receive orders in person or through messaging applications, which can make the ordering process difficult to organize. The target users are customers who want a simple and fast way to explore ice cream products and place orders using their mobile phones. Users will be able to create an account, log in, explore available ice cream flavors, add products to a shopping cart and confirm their orders. The minimum viable product focuses on user registration and login, the ice cream catalog and shopping cart, and order confirmation. The application will be developed using Ionic and React to provide a simple and user-friendly mobile experience.

---

## 8. Flujo general de la aplicación

1. Registro de usuario.
2. Inicio de sesión.
3. Visualización del catálogo de helados.
4. Selección de productos.
5. Agregar productos al carrito.
6. Revisar carrito y total.
7. Confirmar pedido.
8. Visualizar confirmación del pedido.

---

## Tecnologías propuestas

- Ionic
- React
- HTML
- CSS
- JavaScript
- Git
- GitHub