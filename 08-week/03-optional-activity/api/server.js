// API REST de HelpHealth - Semana 8
// Entidad: RegistroSintoma (definida en el modelo de datos de la semana 4)
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // permite que la app Ionic (puerto 8100) llame a la API (puerto 3000)
app.use(express.json()); // permite leer el cuerpo JSON de las peticiones (req.body)

// "Base de datos" en memoria
let sintomas = [
  {
    id: 1,
    fecha: "2026-09-26T08:30:00.000Z",
    tipo: "texto",
    contenido: "Dolor de cabeza leve en la mañana",
  },
];

// GET /sintomas -> lista todos los registros de síntomas
app.get("/sintomas", (req, res) => {
  res.json(sintomas);
});

// POST /sintomas -> crea un nuevo registro de síntoma
app.post("/sintomas", (req, res) => {
  const { tipo, contenido } = req.body;

  if (typeof contenido !== "string" || contenido.trim() === "") {
    return res.status(400).json({ error: "El campo 'contenido' es obligatorio" });
  }

  const nuevo = {
    id: sintomas.length + 1,
    fecha: new Date().toISOString(), // el servidor guarda fecha y hora del registro (RF3)
    tipo: tipo || "texto",
    contenido: contenido.trim(),
  };

  sintomas.push(nuevo);
  res.status(201).json(nuevo); // 201 = creado
});

app.listen(3000, () => console.log("API en http://localhost:3000"));
