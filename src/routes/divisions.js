const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all divisions
router.get("/", (req, res) => {
    db.query("SELECT * FROM division", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET division by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM division WHERE id_division=?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Division not found" });
        res.json(results[0]);
    });
});

// POST create new division
router.post("/", (req, res) => {
    const { division_name } = req.body;
    db.query("INSERT INTO division (division_name) VALUES (?)", [division_name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, division_name });
    });
});

// PUT update division
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { division_name } = req.body;
    db.query("UPDATE division SET division_name=? WHERE id_division=?", [division_name, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id, division_name });
    });
});

// DELETE division
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM division WHERE id_division=?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Division deleted successfully" });
    });
});

module.exports = router;
