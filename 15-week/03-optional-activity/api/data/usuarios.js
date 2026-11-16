// "Base de datos" en memoria: usuarios que pueden iniciar sesión.
// Son los campos de la entidad Usuario del modelo de datos, más el correo y la clave para el login.
// La contraseña NO se guarda: se guarda "sal:hash", el resultado de pasarla por scrypt con una sal.
// Usuario de prueba: ana@helphealth.com / Salud2026*
const usuarios = [
  {
    id: 1,
    nombre: "Ana Torres",
    correo: "ana@helphealth.com",
    clave_hash:
      "9602f2fdc38dc50c516fc119892e678b:267e09f4961b1afb0fc0d13ffcd4f8535bb09efff6739b685cf5c209906b605621aeb4070678437e17e37e328b3b3e9901e25660bd126a81f3aba006918b89d7",
    tipo_discapacidad: "visual",
    tamano_texto: 150,
    alto_contraste: true,
  },
];

module.exports = usuarios;
