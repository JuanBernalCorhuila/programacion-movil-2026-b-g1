// API REST de HelpHealth - punto de entrada.
// Aquí solo se configura y se enciende el servidor; los endpoints están en routes/.
const express = require("express");
const cors = require("cors");
const medicamentosRoutes = require("./routes/medicamentos");

const PORT = 3000;

const app = express();
app.use(cors()); // permite que la app Ionic (puerto 8100) llame a la API (puerto 3000)
app.use(express.json()); // permite leer el cuerpo JSON de las peticiones (req.body)

app.use("/medicamentos", medicamentosRoutes);

app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
