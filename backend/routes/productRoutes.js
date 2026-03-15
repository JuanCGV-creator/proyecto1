const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Importamos la conexión MySQL

// GET - Obtener productos con paginación, búsqueda y filtros
router.get('/', async (req, res) => {
    try {
        let query = 'SELECT * FROM tb_productos WHERE 1=1';
        let queryParams = [];

        // Filtro de búsqueda por nombre o código
        const search = req.query.search?.toLowerCase();
        if (search) {
            query += ' AND (LOWER(nombre_producto) LIKE ? OR LOWER(codigo_producto) LIKE ?)';
            queryParams.push(`%${search}%`, `%${search}%`);
        }

        // Filtro por categoría
        const categoria = req.query.categoria;
        if (categoria && categoria !== 'todas') {
            query += ' AND LOWER(categoria) = ?';
            queryParams.push(categoria.toLowerCase());
        }

        // Contar total de items para paginación
        const countQuery = `SELECT COUNT(*) as total FROM (${query}) AS subquery`;
        const [countResult] = await pool.query(countQuery, queryParams);
        const totalItems = countResult[0].total;

        // Paginación
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const totalPages = Math.ceil(totalItems / limit);

        query += ' ORDER BY id_producto DESC LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [productos] = await pool.query(query, queryParams);

        // Obtener categorías únicas para filtros
        const [categoriasResult] = await pool.query('SELECT DISTINCT categoria FROM tb_productos WHERE categoria IS NOT NULL');
        const categorias = categoriasResult.map(c => c.categoria);

        res.json({
            productos,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                itemsPerPage: limit
            },
            categorias
        });
    } catch (error) {
        console.error("Error loading products Database:", error);
        res.status(500).json({ error: "Error al cargar productos desde la base de datos" });
    }
});

// GET - Obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tb_productos WHERE id_producto = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Error al buscar el producto" });
    }
});

// POST - Crear nuevo producto
router.post("/", async (req, res) => {
    const {
        nombre_producto,
        descripcion,
        codigo_producto,
        categoria,
        precio,
        stock,
        stock_minimo,
        unidad_medida,
        estado
    } = req.body;

    if (!nombre_producto || !codigo_producto || precio === undefined) {
        return res.status(400).json({ error: "Nombre, código y precio son obligatorios" });
    }

    try {
        const insertQuery = `
            INSERT INTO tb_productos 
            (nombre_producto, descripcion, codigo_producto, categoria, precio, stock, stock_minimo, unidad_medida, estado)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            nombre_producto,
            descripcion || null,
            codigo_producto,
            categoria || null,
            parseFloat(precio) || 0,
            parseInt(stock) || 0,
            parseInt(stock_minimo) || 5,
            unidad_medida || null,
            estado || 'ACTIVO'
        ];

        const [result] = await pool.query(insertQuery, valores);

        // Obtener el producto recién creado
        const [nuevoProd] = await pool.query('SELECT * FROM tb_productos WHERE id_producto = ?', [result.insertId]);

        res.json({ success: true, producto: nuevoProd[0] });
    } catch (error) {
        console.error("Error creating product:", error);
        // Manejar error de código duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "El código de producto ya existe" });
        }
        res.status(500).json({ error: "Error al crear producto en la base de datos" });
    }
});

// PUT - Actualizar producto existente
router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    const {
        nombre_producto,
        descripcion,
        codigo_producto,
        categoria,
        precio,
        stock,
        stock_minimo,
        unidad_medida,
        estado
    } = req.body;

    try {
        // Verificar si existe
        const [exist] = await pool.query('SELECT id_producto FROM tb_productos WHERE id_producto = ?', [productId]);
        if (exist.length === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const updateQuery = `
            UPDATE tb_productos 
            SET nombre_producto = ?, descripcion = ?, codigo_producto = ?, categoria = ?, 
                precio = ?, stock = ?, stock_minimo = ?, unidad_medida = ?, estado = ?
            WHERE id_producto = ?
        `;
        const valores = [
            nombre_producto,
            descripcion,
            codigo_producto,
            categoria,
            precio,
            stock,
            stock_minimo,
            unidad_medida,
            estado,
            productId
        ];

        await pool.query(updateQuery, valores);

        // Obtener el producto actualizado
        const [updatedProd] = await pool.query('SELECT * FROM tb_productos WHERE id_producto = ?', [productId]);

        res.json({ success: true, producto: updatedProd[0] });
    } catch (error) {
        console.error("Error updating product:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "El código de producto ya existe para otro registro" });
        }
        res.status(500).json({ error: "Error al actualizar producto" });
    }
});

// DELETE - Eliminar producto
router.delete("/:id", async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM tb_productos WHERE id_producto = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado o ya eliminado" });
        }

        res.json({ success: true, message: "Producto eliminado correctamente" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
});

module.exports = router;
