const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all departments
router.get("/", (req, res) => {
    db.query("SELECT * FROM department", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// GET department by ID
router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM department WHERE id_department=?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Department not found" });
        res.json(results[0]);
    });
});

// POST create new department
router.post("/", (req, res) => {
    const { department_name, id_division } = req.body;
    db.query(
        "INSERT INTO department (department_name, id_division) VALUES (?, ?)",
        [department_name, id_division],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: result.insertId, department_name, id_division });
        }
    );
});

// PUT update department
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { department_name, id_division } = req.body;
    db.query(
        "UPDATE department SET department_name=?, id_division=? WHERE id_department=?",
        [department_name, id_division, id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id, department_name, id_division });
        }
    );
});

// DELETE department
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM department WHERE id_department=?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Department deleted successfully" });
    });
});

module.exports = router;
