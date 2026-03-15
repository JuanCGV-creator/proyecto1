const express = require("express");
const router = express.Router();
const { envios } = require("../data/memoryStore");

// ====================== DISTRIBUCIÓN ======================
router.get("/", (req, res) => res.json(envios));

router.post("/", (req, res) => {
    envios.push(req.body);
    res.json({ success: true });
});

module.exports = router;
