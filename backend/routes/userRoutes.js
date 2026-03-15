const express = require("express");
const router = express.Router();

let users = [
  { email: "admin@demo.com", password: "12345", nombre: "Administrador", imagen: "" }
];

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, nombre: user.nombre, imagen: user.imagen });
  } else {
    res.json({ success: false });
  }
});

router.post("/register", (req, res) => {
  const { nombres, apellidos, cedula, fecha, email, password, imagen } = req.body;

  if (!nombres || !apellidos || !cedula || !fecha || !email || !password) {
    return res.json({ success: false, message: "Todos los campos son obligatorios" });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.json({ success: false, message: "El usuario ya existe" });
  }

  const nuevaImagen = imagen && imagen.startsWith("data:image") ? imagen : "/images/JuanCGarzon.png";

  users.push({ email, password, nombre: `${nombres} ${apellidos}`, imagen: nuevaImagen });
  res.json({ success: true, message: "Registro exitoso" });
});

module.exports = router;
