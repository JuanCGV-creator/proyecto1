const express = require("express");
const router = express.Router();
const { clientes } = require("../data/memoryStore");

// ====================== CRUD CLIENTES ======================
router.get("/", (req, res) => res.json(clientes));

router.post("/", (req, res) => {
    clientes.push(req.body);
    res.json({ success: true });
});

module.exports = router;
