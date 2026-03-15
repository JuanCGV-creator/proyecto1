const express = require("express");
const router = express.Router();
const { notificaciones } = require("../data/memoryStore");

// ====================== NOTIFICACIONES ======================
router.get("/", (req, res) => res.json(notificaciones));

router.post("/", (req, res) => {
    notificaciones.push(req.body);
    res.json({ success: true });
});

module.exports = router;
