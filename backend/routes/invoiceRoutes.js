const express = require("express");
const router = express.Router();
const { facturas } = require("../data/memoryStore");

// ====================== FACTURACIÓN ======================
router.get("/", (req, res) => res.json(facturas));

router.post("/", (req, res) => {
    facturas.push(req.body);
    res.json({ success: true });
});

module.exports = router;
