# 🏢 Apartment Complaint Management System

A full-stack web application that allows residents of an apartment to raise complaints and enables admins to manage and resolve them efficiently.

---

## 🚀 Features

### 👤 Resident

- Register & Login (JWT Authentication)
- Create complaints
- View own complaints
- Track complaint status (Open / In Progress / Resolved)

### 🛠️ Admin

- View all complaints
- Update complaint status
- See complaint owner details (name & email)
- No ability to create complaints (management only)

---

## 🧰 Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication

---

## 📁 Project Structure

apartment-complaint-system/
│
├── client/ # React Frontend
├── server/ # Node.js Backend
├── .gitignore
└── README.md

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/apartment-complaint-system.git
cd apartment-complaint-system

Setup Backend
cd server
npm install

Create .env file:

PORT=3000
PGHOST=localhost
PGPORT=5432
PGDATABASE=your_db_name
PGUSER=your_user
PGPASSWORD=your_password
JWT_SECRET=your_secret_key

Run backend:

npm run dev
3️⃣ Setup Frontend
cd client
npm install
npm start

Frontend runs on:

http://localhost:3001

Database Schema
Users Table
Column	Type
id	SERIAL
name	TEXT
email	TEXT
password	TEXT
role	TEXT

Complaints Table
Column	Type
id	SERIAL
user_id	INTEGER
title	TEXT
description	TEXT
category	TEXT
priority	TEXT
status	TEXT
created_at	TIMESTAMP

Authentication
JWT-based authentication
Token stored in localStorage
Protected routes on frontend
Middleware verification on backend
🔄 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login

Complaints
POST /api/complaints → Create complaint
GET /api/complaints → Get complaints
PUT /api/complaints/:id/status → Update status (Admin only)
🎯 Roles & Access
Feature	Resident	Admin
Create Complaint	✅	❌
View Own Complaints	✅	❌
View All Complaints	❌	✅

UI Highlights
Modern Tailwind-based design
Responsive layout
Role-based UI rendering
Navbar with user info & logout
Clean complaint cards with status badges

Future Improvements
Add filters (status/category)
Add search functionality
Add notifications/toasts
File/image upload for complaints
Deployment (AWS / Vercel / Render)


👨‍💻 Author
Riyaz Jaleel

If you like this project

Give it a ⭐ on GitHub!
```
