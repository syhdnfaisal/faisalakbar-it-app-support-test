const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /employees → semua data
router.get("/", (req, res) => {
    const sql = `
        SELECT e.id_employees, e.employee_name, e.employee_email, e.hire_date,
           d.department_name, dd.division_name
        FROM employees e
        JOIN department d ON e.department_id = d.id_department
        JOIN division dd ON d.id_division = dd.id_division
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        res.status(200).json(results);
    });
});


// GET /employees/:id → ambil detail berdasarkan ID
router.get("/:id", (req, res) => {
    const sql = `
    SELECT e.id_employees, e.employee_name, e.employee_email, e.hire_date,
           d.department_name, dd.division_name
    FROM employees e
    JOIN department d ON e.department_id = d.id_department
    JOIN division dd ON d.id_division = dd.id_division
    WHERE e.id_employees = ?
  `;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Employee not found" });
        res.json(results[0]);
    });
});

// POST /employees → tambah karyawan baru
router.post("/", (req, res) => {
    const { employee_name, employee_email, department_id, hire_date } = req.body;
    const sql = `INSERT INTO employees (employee_name, employee_email, department_id, hire_date) VALUES (?, ?, ?, ?)`;
    db.query(sql, [employee_name, employee_email, department_id, hire_date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Employee created", id: result.insertId });
    });
});

// PUT /employees/:id → update karyawan
router.put("/:id", (req, res) => {
    const { employee_name, employee_email, department_id, hire_date } = req.body;
    const sql = `UPDATE employees SET employee_name=?, employee_email=?, department_id=?, hire_date=? WHERE id_employees=?`;
    db.query(sql, [employee_name, employee_email, department_id, hire_date, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Employee not found" });
        res.json({ message: "Employee updated" });
    });
});

// DELETE /employees/:id → hapus data
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM employees WHERE id_employees = ?", [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Employee deleted successfully" });
    });
});

module.exports = router;
