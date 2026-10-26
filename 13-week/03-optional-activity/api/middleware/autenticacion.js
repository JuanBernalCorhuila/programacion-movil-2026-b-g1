// Middleware que protege las rutas: solo deja pasar peticiones con un token válido.
// El servidor no guarda sesiones; le basta con verificar la firma y la fecha de vencimiento del token.
const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  // La app envía la cabecera "Authorization: Bearer <token>"
  const [tipo, token] = (req.headers.authorization || "").split(" ");

  if (tipo !== "Bearer" || !token) {
    return res.status(401).json({ error: "Debes iniciar sesión para continuar" });
  }

  try {
    const datos = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = { id: datos.sub }; // quién hace la petición sale del token, no del cuerpo
    next();
  } catch (e) {
    const mensaje =
      e.name === "TokenExpiredError" ? "Tu sesión venció" : "Tu sesión no es válida";
    res.status(401).json({ error: mensaje });
  }
}

module.exports = verificarToken;
