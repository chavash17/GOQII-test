# GOQii Developer Test – User Management App

This project is a simple full-stack application to perform CRUD operations (Create, Read, Update, Delete) on users using **Core PHP** for backend and **React.js** for frontend.

---

## 📁 Project Structure

```
GOQii-Test/
├── backend/
│   ├── db.php          # Database connection
│   └── user.php        # API to handle user CRUD operations
├── frontend/           # React frontend code
├── goqii_test.sql      # SQL file to create users table
└── README.md
```

---

## 🚀 Setup Instructions

### Backend (PHP + MySQL)
1. Start Apache and MySQL using XAMPP/WAMP.
2. Create a database named `goqii_test`.
3. Import the `goqii_test.sql` file into your database using phpMyAdmin or CLI.
4. Place the `GOQii-Test` folder in `C:/xampp/htdocs/`.
5. Make sure `db.php` contains your correct DB credentials.

Test backend by opening:  
[http://localhost/GOQii-Test/backend/user.php](http://localhost/GOQii-Test/backend/user.php)

### Frontend (React)
1. Open terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
npm start
```

The app will open in your browser at:  
[http://localhost:3000](http://localhost:3000)

---

## 🗃️ SQL Table (goqii_test.sql)

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  dob DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📌 Features

- Add new users
- List all users
- Edit and update user details
- Delete users with confirmation
- Form validation and email duplication check
- Calendar input for DOB
- Toast alerts for success and error messages

---

## 📬 API Endpoints (user.php)

| Method | URL                      | Description        |
|--------|--------------------------|--------------------|
| GET    | `/backend/user.php`      | List all users     |
| POST   | `/backend/user.php`      | Add a new user     |
| PUT    | `/backend/user.php`      | Update a user      |
| DELETE | `/backend/user.php?id=1` | Delete user by ID  |

---

## ✅ Done!



