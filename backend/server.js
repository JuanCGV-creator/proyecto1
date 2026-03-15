// ====================== SERVER.JS =========================
// Backend básico en Express para el sistema de distribución
// Maneja almacenamiento temporal en memoria

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware de API
const authApi = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "No autorizado" });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).json({ error: "Token inválido" });
    }
};

// Middleware para vistas protegidas
const authView = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.redirect("/login");
    }
};

// Permitir acceso a estáticos pero proteger las páginas HTML sensibles
app.use((req, res, next) => {
    const publicPages = ['/', '/login', '/login.html', '/register', '/register.html', '/error', '/error.html'];
    const isHtml = req.path.endsWith('.html');

    // Si intenta acceder a un HTML directamente (ej: /panel.html) y no es público
    if (isHtml && !publicPages.includes(req.path)) {
        return authView(req, res, next);
    }
    next();
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../frontend")));

// ====================== RUTAS API ======================
app.use("/api", require("./routes/authRoutes"));
app.use("/api/clientes", authApi, require("./routes/clientRoutes"));
app.use("/api/productos", authApi, require("./routes/productRoutes"));
app.use("/api/productosxml", authApi, require("./routes/productRoutesXML"));
app.use("/api/ventas", authApi, require("./routes/saleRoutes"));
app.use("/api/facturas", authApi, require("./routes/invoiceRoutes"));
app.use("/api/envios", authApi, require("./routes/shipmentRoutes"));
app.use("/api/notificaciones", authApi, require("./routes/notificationRoutes"));

// ====================== RUTAS DE PÁGINAS ======================
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

app.get("/panel", authView, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/panel.html"));
});

app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/error.html"));
});

// ====================== INICIAR SERVIDOR ======================
app.listen(PORT, () =>
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
