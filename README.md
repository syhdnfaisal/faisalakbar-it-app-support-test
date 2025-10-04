# Employee Management REST API

Proyek ini adalah implementasi REST API menggunakan **Node.js + Express + MySQL** berdasarkan ERD (Employees – Department – Division). API ini menyediakan endpoint CRUD untuk mengelola data karyawan, departemen, dan divisi.

---

## 📌 Fitur

### Employees

* **GET /employees** → Menampilkan seluruh data karyawan beserta department dan division.
* **GET /employees/:id** → Menampilkan detail karyawan berdasarkan ID.
* **POST /employees** → Menambahkan karyawan baru.
* **PUT /employees/:id** → Mengupdate data karyawan.
* **DELETE /employees/:id** → Menghapus karyawan.

### Departments

* **GET /departments** → Menampilkan seluruh department beserta division.
* **GET /departments/:id** → Menampilkan detail department berdasarkan ID.
* **POST /departments** → Menambahkan department baru.
* **PUT /departments/:id** → Mengupdate data department.
* **DELETE /departments/:id** → Menghapus department.

### Divisions

* **GET /divisions** → Menampilkan seluruh division.
* **GET /divisions/:id** → Menampilkan detail division berdasarkan ID.
* **POST /divisions** → Menambahkan division baru.
* **PUT /divisions/:id** → Mengupdate data division.
* **DELETE /divisions/:id** → Menghapus division.

---

---

## ⚙️ Instalasi & Menjalankan

1. **Clone repository**

   ```bash
   git clone https://github.com/syhdnfaisal/faisalakbar-it-app-support-test
   cd faisalakbar-it-app-support-test
   ```

2. **Install dependencies**

   ```bash
   npm init -y
   npm install express mysql2 nodemon
   ```

3. **Konfigurasi database**

   * Buat database MySQL atau Restore database zulu.sql
   * Nama Database: zulu

     ```sql
     CREATE TABLE division (
       id_division INT AUTO_INCREMENT PRIMARY KEY,
       division_name VARCHAR(100)
     );

     CREATE TABLE department (
       id_department INT AUTO_INCREMENT PRIMARY KEY,
       department_name VARCHAR(100),
       id_division INT,
       FOREIGN KEY (id_division) REFERENCES division(id_division)
     );

     CREATE TABLE employees (
       id_employees INT AUTO_INCREMENT PRIMARY KEY,
       employee_name VARCHAR(100),
       employee_email VARCHAR(100),
       department_id INT,
       hire_date DATE,
       FOREIGN KEY (department_id) REFERENCES department(id_department)
     );
     ```

     ```sql
      select * from division;
      +-------------+------------------------+
      | id_division | division_name          |
      +-------------+------------------------+
      |           1 | Information Technology |
      |           3 | Finance & Accounting   |
      |           4 | Human Resources        |
      +-------------+------------------------+

      select * from department;
      +---------------+-------------+-----------------------+
      | id_department | id_division | department_name       |
      +---------------+-------------+-----------------------+
      |             1 |           1 | IT Development        |
      |             2 |           1 | Application Support   |
      |             3 |           1 | IT Infrastructure     |
      |             4 |           1 | IT Network Operations |
      |             5 |           3 | Finance               |
      |             6 |           3 | Accounting            |
      |             7 |           4 | Recruiter             |
      |             8 |           4 | Talent Acquisition    |
      +---------------+-------------+-----------------------+

      select * from employees;
      +--------------+------------------+----------------------------+---------------+------------+
      | id_employees | employee_name    | employee_email             | department_id | hire_date  |
      +--------------+------------------+----------------------------+---------------+------------+
      |            1 | Test             | test@gmail.com             |             5 | 2025-10-03 |
      |            4 | Faisal           | faisal@gmail.com           |             6 | 2025-10-03 |
      |            5 | Akbar            | Akbar@gmail.com            |             2 | 2025-10-03 |
      |            6 | Nurul Fadhilah   | nurulfadhilah488@gmail.com |             1 | 2025-10-03 |
      |            7 | Wahyudiyanto     | wahyudiyanto@gmail.com     |             7 | 2025-10-03 |
      |            8 | Baihaqi Ramadhan | baihaqiramadhan@gmail.com  |             4 | 2025-10-03 |
      |            9 | Akbar Faisal     | akbarfaisal@gmail.com      |             2 | 2025-10-03 |
      +--------------+------------------+----------------------------+---------------+------------+
     
     SELECT e.id_employees, e.employee_name, e.employee_email, e.hire_date,
           d.department_name, dd.division_name
        FROM employees e
        JOIN department d ON e.department_id = d.id_department
        JOIN division dd ON d.id_division = dd.id_division;
     +--------------+------------------+----------------------------+------------+-----------------------+------------------------+
    | id_employees | employee_name    | employee_email             | hire_date  | department_name       | division_name          |
    +--------------+------------------+----------------------------+------------+-----------------------+------------------------+
    |            5 | Akbar            | Akbar@gmail.com            | 2025-10-03 | Application Support   | Information Technology |
    |            6 | Nurul Fadhilah   | nurulfadhilah488@gmail.com | 2025-10-03 | IT Development        | Information Technology |
    |            8 | Baihaqi Ramadhan | baihaqiramadhan@gmail.com  | 2025-10-03 | IT Network Operations | Information Technology |
    |            9 | Akbar Faisal     | akbarfaisal@gmail.com      | 2025-10-03 | Application Support   | Information Technology |
    |            1 | Test             | test@gmail.com             | 2025-10-03 | Finance               | Finance & Accounting   |
    |            4 | Faisal           | faisal@gmail.com           | 2025-10-03 | Accounting            | Finance & Accounting   |
    |            7 | Wahyudiyanto     | wahyudiyanto@gmail.com     | 2025-10-03 | Recruiter             | Human Resources        |
    +--------------+------------------+----------------------------+------------+-----------------------+------------------------+
     ```

   * Edit file `src/db.js` untuk menyesuaikan koneksi:

     ```js
     const mysql = require("mysql2");
     const db = mysql.createConnection({
       host: "localhost",
       user: "root",
       password: "",
       database: "zulu"
     });
     module.exports = db;
     ```

4. **Jalankan server**

    ```bash
   cd faisalakbar-it-app-support-test
   npm run dev
   ```
   

5. **Server berjalan di**

   ```
   http://localhost:3000
   ```

---

## 📮 Contoh Request

### Employees

#### Tambah Karyawan

```http
POST /employees
Content-Type: application/json

{
  "employee_name": "Akbar Faisal",
  "employee_email": "akbarfaisal@gmail.com",
  "department_id": 2,
  "hire_date": "2025-10-03"
}
```

#### Update Karyawan

```http
PUT /employees/5
Content-Type: application/json

{
  "employee_name": "Akbar",
  "employee_email": "akbar@gmail.com",
  "department_id": 2,
  "hire_date": "2025-10-03"
}
```

---

### Departments

#### Tambah Department

```http
POST /departments
Content-Type: application/json

{
  "department_name": "Human Resources",
  "id_division": 1
}
```

#### Update Department

```http
PUT /departments/1
Content-Type: application/json

{
  "department_name": "Finance",
  "id_division": 5
}
```

---

### Divisions

#### Tambah Division

```http
POST /divisions
Content-Type: application/json

{
  "division_name": "Finance & Accounting"
}
```

#### Update Division

```http
PUT /divisions/1
Content-Type: application/json

{
  "division_name": "IT Operations"
}
```

---

## 🛠 Tools

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)

---

