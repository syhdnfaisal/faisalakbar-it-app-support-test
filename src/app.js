const express = require("express");
const app = express();
const employeesRouter = require("./routes/employees");
const departmentsRouter = require("./routes/departments");
const divisionsRouter = require("./routes/divisions");

app.use(express.json());

app.use("/employees", employeesRouter);
app.use("/departments", departmentsRouter);
app.use("/divisions", divisionsRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
