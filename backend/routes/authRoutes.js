const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

// ====================== AUTENTICACIÓN ======================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario en MySQL
        const [rows] = await pool.query(
            "SELECT * FROM tb_usuarios WHERE correo_electronico = ?",
            [email]
        );

        const user = rows[0];

        if (!user) {
            return res.status(401).json({ success: false, message: "Usuario no creado o disponible" });
        }

        // Permitir un admin hardcodeado para debug, o desencriptar MySQL password_hash
        const isDbPassValid = bcrypt.compareSync(password, user.password_hash);
        const isLegacyPassValid = (password === user.password_hash);

        if (isDbPassValid || isLegacyPassValid) {
            // Generar JWT
            const payload = {
                id: user.id_usuario,
                email: user.correo_electronico,
                nombre: `${user.nombres} ${user.apellidos}`,
                rol: user.rol
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h" });

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 8 * 60 * 60 * 1000 // 8 horas
            });

            return res.json({
                success: true,
                message: "Usuario válido para ingresar",
                user: payload
            });
        }

        return res.status(401).json({ success: false, message: "Usuario no creado o disponible" });
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { email, password, nombre, apellido, cedula, nacimiento } = req.body;

        if (!email || !password || !nombre || !apellido || !cedula || !nacimiento) {
            return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
        }

        // Verificar si existe el usuario o la cédula
        const [existing] = await pool.query(
            "SELECT id_usuario FROM tb_usuarios WHERE correo_electronico = ? OR cedula = ?",
            [email, cedula]
        );

        if (existing.length > 0) {
            return res.status(400).json({ success: false, message: "Correo o cédula ya están registrados" });
        }

        const passHash = bcrypt.hashSync(password, 10);

        // Insertar en tb_usuarios
        await pool.query(
            `INSERT INTO tb_usuarios (nombres, apellidos, cedula, fecha_nacimiento, correo_electronico, password_hash) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, apellido, cedula, nacimiento, email, passHash]
        );

        res.json({ success: true, message: "Registro exitoso" });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ success: false, message: "Error interno del servidor", error: error.message });
    }
});

module.exports = router;
