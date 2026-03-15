// ====================== BASES DE DATOS TEMPORALES ======================
let usuarios = [
    {
        email: "admin@demo.com",
        password: "12345",
        nombre: "Administrador",
        foto: "/images/JuanCGarzon.pgn"
    }
];

let clientes = [];
let productos = [];
let ventas = [];
let facturas = [];
let envios = [];
let notificaciones = [];

module.exports = {
    usuarios,
    clientes,
    productos,
    ventas,
    facturas,
    envios,
    notificaciones
};
