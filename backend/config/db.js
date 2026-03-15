const mysql = require("mysql2/promise");
require("dotenv").config();

// Crear el pool de conexiones con las variables de DB
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "Daniel142417$",
    database: process.env.DB_NAME || "db_distribucionmercancia",
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Comprobar la conexión inicial (opcional, ayuda al debugeo)
pool.getConnection()
    .then(connection => {
        console.log("✅ Conexión exitosa a MySQL (db_distribucionmercancia)");
        connection.release();
    })
    .catch(err => {
        console.error("❌ Error conectando a MySQL:", err.message);
    });

module.exports = pool;
