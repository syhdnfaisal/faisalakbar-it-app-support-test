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

## 📂 Struktur Project

```
project-root/
│-- config/
│   └── db.js           # Koneksi ke database MySQL
│-- routes/
│   ├── employees.js    # Endpoint employees
│   ├── departments.js  # Endpoint departments
│   └── divisions.js    # Endpoint divisions
│-- index.js            # Entry point server
│-- package.json
│-- README.md
```

---

## ⚙️ Instalasi & Menjalankan

1. **Clone repository**

   ```bash
   git clone https://github.com/syhdnfaisal/faisalakbar-it-app-support-test
   cd crud-employees
   ```

2. **Install dependencies**

   ```bash
   npm install express mysql2 nodemon
   ```

3. **Konfigurasi database**

   * Buat database MySQL

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

   cd crud-employees
   npm run dev
   

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

