# 💼 Job Board API

A RESTful Job Board API built with **Node.js**, **Express**, **Sequelize**, and **PostgreSQL**, following a **Controller → Repository → Model** architecture pattern.

---

## ⚙️ Prerequisites

* Node.js v18+
* PostgreSQL

---

## 🚀 Setup

### 1. Clone the repository

```bash
git clone https://github.com/denisktoo/job-board-node.git
cd job-board-node
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the PostgreSQL database

```bash
sudo -u postgres psql
```

```sql
CREATE DATABASE job_board_db;
\q
```

### 4. Generate a JWT secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output for the next step.

### 5. Configure environment variables

Create a `.env` file at the project root:

```env
PORT=5000

DB_NAME=job_board_db
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432

JWT_SECRET=your_generated_secret
```

### 6. Run the server

```bash
npm run dev
```

Expected output:

```
Database connected successfully
Database synced successfully
Server running on port 5000
```

---

## 📖 API Documentation

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

---

## 🔐 Authentication

Login returns a JWT token. Pass it in the `Authorization` header for protected routes:

```
Authorization: Bearer <access_token>
```

---

## 🔐 Role-Based Access Control

| Role | Permissions |
| --- | --- |
| **job_seeker** | Apply to jobs, view jobs and companies |
| **employer** | Create and manage companies and jobs |
| **admin** | Full access |

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `POST` | `/api/users/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and get JWT token | No |
| `GET` | `/api/users` | List all users | No |
| `GET` | `/api/users/:id` | Get user by ID | No |
| `POST` | `/api/companies` | Create a company | Yes (employer) |
| `GET` | `/api/companies` | List all companies | No |
| `GET` | `/api/companies/:id` | Get company by ID | No |
| `POST` | `/api/jobs` | Create a job | Yes (employer) |
| `GET` | `/api/jobs` | List all jobs | No |
| `GET` | `/api/jobs/:id` | Get job by ID | No |
| `POST` | `/api/applications` | Apply to a job | Yes (job_seeker) |
| `GET` | `/api/applications` | List all applications | No |
| `GET` | `/api/applications/:id` | Get application by ID | No |
