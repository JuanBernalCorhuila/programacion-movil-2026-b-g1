// API REST de HelpHealth - punto de entrada.
// Aquí solo se configura y se enciende el servidor; los endpoints están en routes/.
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const medicamentosRoutes = require("./routes/medicamentos");
const verificarToken = require("./middleware/autenticacion");

const PORT = 3000;

// Sin la clave para firmar los tokens el servidor no arranca (se define en el archivo .env)
if (!process.env.JWT_SECRET) {
  console.error("Falta JWT_SECRET. Copia .env.example como .env y escribe una clave.");
  process.exit(1);
}

const app = express();
app.use(cors()); // permite que la app Ionic (puerto 8100) llame a la API (puerto 3000)
app.use(express.json()); // permite leer el cuerpo JSON de las peticiones (req.body)

app.use("/", authRoutes); // POST /login es público
app.use("/medicamentos", verificarToken, medicamentosRoutes); // todo /medicamentos pide token

app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
