// Endpoints de la entidad RegistroSintoma. Todas las respuestas son JSON.
// Estas rutas pasan antes por verificarToken, así que req.usuario.id siempre existe.
const express = require("express");
const sintomas = require("../data/sintomas");

const router = express.Router();

// GET /sintomas -> historial del usuario que inició sesión, del más reciente al más antiguo
router.get("/", (req, res) => {
  const propios = sintomas
    .filter((s) => s.usuario_id === req.usuario.id)
    .sort((a, b) => b.fecha.localeCompare(a.fecha)); // las fechas ISO se ordenan como texto

  res.json(propios);
});

// POST /sintomas -> registra cómo se siente el usuario hoy
router.post("/", (req, res) => {
  const { contenido } = req.body;

  if (typeof contenido !== "string" || contenido.trim() === "") {
    return res.status(400).json({ error: "Escribe cómo te sientes antes de guardar" });
  }

  const nuevo = {
    id: sintomas.length + 1,
    usuario_id: req.usuario.id, // el dueño sale del token, no de lo que envía la app
    fecha: new Date().toISOString(), // el servidor pone la fecha y la hora del registro
    tipo: "texto", // por ahora la app solo registra texto
    contenido: contenido.trim(),
  };

  sintomas.push(nuevo);
  res.status(201).json(nuevo); // 201 = creado
});

module.exports = router;
