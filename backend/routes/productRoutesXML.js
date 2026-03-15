const express = require('express');
const router = express.Router();
const { loadProductsFromXML, saveProductsToXML } = require('../utils/xmlLoader');
let { productos } = require('../data/memoryStore');

// Variable para almacenar productos en memoria
let productosCache = [];

// Cargar productos iniciales
async function initProducts() {
    try {
        productosCache = await loadProductsFromXML();
    } catch (error) {
        console.error("Error loading XML products:", error);
        productosCache = productos || [];
    }
}
initProducts();

// GET - Obtener productos con paginación, búsqueda y filtros
router.get('/', async (req, res) => {
    try {
        let resultado = [...productosCache];

        // Filtro de búsqueda por nombre o código
        const search = req.query.search?.toLowerCase();
        if (search) {
            resultado = resultado.filter(p =>
                p.nombre?.toLowerCase().includes(search) ||
                p.codigo?.toLowerCase().includes(search)
            );
        }

        // Filtro por categoría
        const categoria = req.query.categoria;
        if (categoria && categoria !== 'todas') {
            resultado = resultado.filter(p =>
                p.categoria?.toLowerCase() === categoria.toLowerCase()
            );
        }

        // Paginación
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const totalItems = resultado.length;
        const totalPages = Math.ceil(totalItems / limit);
        const paginatedItems = resultado.slice(startIndex, endIndex);

        // Obtener categorías únicas para filtros
        const categorias = [...new Set(productosCache.map(p => p.categoria).filter(Boolean))];

        res.json({
            productos: paginatedItems,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                itemsPerPage: limit
            },
            categorias
        });
    } catch (error) {
        console.error("Error loading products:", error);
        res.status(500).json({ error: "Error al cargar productos" });
    }
});

// GET - Obtener un producto por ID
router.get('/:id', (req, res) => {
    const producto = productosCache.find(p => p.id === req.params.id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

// POST - Crear nuevo producto
router.post("/", (req, res) => {
    const nuevoProducto = {
        id: Date.now().toString(),
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        precio: parseFloat(req.body.precio) || 0,
        stock: parseInt(req.body.stock) || 0,
        categoria: req.body.categoria || 'Sin categoría',
        imagen: req.body.imagen || null
    };

    if (!nuevoProducto.nombre || !nuevoProducto.codigo) {
        return res.status(400).json({ error: "Nombre y código son obligatorios" });
    }

    productosCache.push(nuevoProducto);

    // Save to XML
    saveProductsToXML(productosCache).catch(err => console.error("XML Save Error:", err));

    res.json({ success: true, producto: nuevoProducto });
});

// PUT - Actualizar producto existente
router.put("/:id", (req, res) => {
    const index = productosCache.findIndex(p => p.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    productosCache[index] = {
        ...productosCache[index],
        nombre: req.body.nombre || productosCache[index].nombre,
        codigo: req.body.codigo || productosCache[index].codigo,
        precio: parseFloat(req.body.precio) || productosCache[index].precio,
        stock: parseInt(req.body.stock) || productosCache[index].stock,
        categoria: req.body.categoria || productosCache[index].categoria,
        imagen: req.body.imagen !== undefined ? req.body.imagen : productosCache[index].imagen
    };

    // Save to XML
    saveProductsToXML(productosCache).catch(err => console.error("XML Save Error:", err));

    res.json({ success: true, producto: productosCache[index] });
});

// DELETE - Eliminar producto
router.delete("/:id", (req, res) => {
    const index = productosCache.findIndex(p => p.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    const eliminado = productosCache.splice(index, 1)[0];

    // Save to XML
    saveProductsToXML(productosCache).catch(err => console.error("XML Save Error:", err));

    res.json({ success: true, producto: eliminado });
});

module.exports = router;
