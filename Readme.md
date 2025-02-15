# Student Management System API

## Overview

This is a basic **Student Management System API** built using **ExpressJS** and **TypeScript**, with **MongoDB Atlas** as the database. The API provides features for both **Admin** and **Student** users.

## Features

### Admin Panel

- Admin can log in using predefined credentials.
- Admin can add students with their name, email ID, department, and password.
- Admin can assign tasks to students with a due date.

### Student Interface

- Students can log in using their email ID and password.
- Students can view the tasks assigned to them.
- Students can see the status of each task (Pending, Overdue, Completed).
- Students can update the status of their tasks.

## Authentication

- **JWT-based authentication** is used for security.
- The **admin panel** is only accessible by the admin.
- **Session or cookies are NOT used** for authentication.

## API Documentation

- The API documentation is available on **Postman**.
- **[Postman Collection URL: YOUR\_POSTMAN\_DOC\_URL]** (Replace with actual URL)

## Installation & Setup

### Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB Atlas** account
- **Postman** for API testing

### Steps to Run

1. Clone the repository:
   ```sh
   git clone https://github.com/YOUR_GITHUB_REPO.git
   cd student-management-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables: Create a `.env` file and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=admin@admin.com
   ADMIN_PASSWORD=admin
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Authentication

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| POST   | `/api/auth/login` | Admin/Student login |

### Admin Routes

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| POST   | `/api/admin/add-student` | Add a new student          |
| POST   | `/api/admin/assign-task` | Assign a task to a student |

### Student Routes

| Method | Endpoint                          | Description        |
| ------ | --------------------------------- | ------------------ |
| GET    | `/api/student/get-tasks`          | Get assigned tasks |
| PUT    | `/api/student/update-task-status` | Update task status |

## Sample API Request

### **Login Request (Admin/Student)**

```json
{
  "email": "admin@admin.com",
  "password": "admin"
}
```

### **Add Student Request (Admin Only)**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "department": "Computer Science",
  "password": "password123",
  "role": "student"
}
```

### **Assign Task Request (Admin Only)**

```json
{
  "taskName": "Math Assignment",
  "description": "Complete exercises 1-10 from chapter 3",
  "studentId": "60d5b2c8f9b5c50015d3b511",
  "dueDate": "2025-03-15T00:00:00.000Z",
  "priority": "high"
}
```

## Technologies Used

- **Express.js** (Backend Framework)
- **TypeScript** (Strongly Typed JavaScript)
- **MongoDB Atlas** (Cloud Database)
- **JWT** (Authentication)
- **Zod** (Request Validation)

## Contribution

Feel free to fork this repository and submit pull requests with improvements.

## License

This project is licensed under the **MIT License**.

---

**Author:** YOUR\_NAME

