// Endpoint de inicio de sesión: recibe correo y clave, y si son correctos devuelve un token JWT.
const crypto = require("crypto");
const express = require("express");
const jwt = require("jsonwebtoken");
const usuarios = require("../data/usuarios");

const router = express.Router();

// Compara la clave escrita con el hash guardado, sin guardar nunca la clave real
function claveCorrecta(clave, claveHash) {
  const [sal, hashGuardado] = claveHash.split(":");
  const hashEscrito = crypto.scryptSync(clave, sal, 64);
  return crypto.timingSafeEqual(hashEscrito, Buffer.from(hashGuardado, "hex"));
}

// POST /login -> { token }
router.post("/login", (req, res) => {
  const { correo, clave } = req.body;

  if (typeof correo !== "string" || typeof clave !== "string" || !correo.trim() || !clave) {
    return res.status(400).json({ error: "Escribe tu correo y tu contraseña" });
  }

  const usuario = usuarios.find((u) => u.correo === correo.trim().toLowerCase());

  // Mismo mensaje si el correo no existe o si la clave falla: así no se revela qué correos están registrados
  if (!usuario || !claveCorrecta(clave, usuario.clave_hash)) {
    return res.status(401).json({ error: "Correo o contraseña incorrectos" });
  }

  // El token lleva el id del usuario (sub) y vence según JWT_EXPIRES_IN
  const token = jwt.sign({ sub: usuario.id, nombre: usuario.nombre }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });

  res.json({ token });
});

module.exports = router;
