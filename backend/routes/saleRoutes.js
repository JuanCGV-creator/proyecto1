const express = require("express");
const router = express.Router();
const { ventas } = require("../data/memoryStore");

// ====================== CRUD VENTAS ======================
router.get("/", (req, res) => res.json(ventas));

router.post("/", (req, res) => {
    ventas.push(req.body);
    res.json({ success: true });
});

module.exports = router;
