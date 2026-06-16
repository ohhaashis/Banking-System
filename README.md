# 🏦 Banking Ledger System

This is complete ADVANCED Backend project on Banking System

A full-stack banking application built using the MERN stack that simulates real-world banking operations such as account creation, fund transfers, transaction tracking, and ledger-based balance management.

## 🚀 Features

### 👤 Authentication

* User Registration
* User Login
* JWT Authentication
* Secure Logout

### 💳 Account Management

* Create Multiple Accounts
* View All Accounts
* Account Status Tracking
* Balance Retrieval

### 💸 Money Transfers

* Transfer Funds Between Accounts
* Balance Validation
* Account Status Validation
* Idempotency Key Support
* Transaction Processing Flow

### 📒 Ledger-Based Accounting

* Debit Entries
* Credit Entries
* Double Entry Bookkeeping
* Balance Derived from Ledger Records

### 📊 Transaction History

* View Complete Transaction Records
* Transaction Status Tracking
* Timestamped Transaction Logs

### 🎨 Frontend

* Responsive UI
* Built with React + Tailwind CSS
* Modern Banking Dashboard
* Account Cards & Transaction Views

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* HTTP Cookies

### Database

* MongoDB Atlas / MongoDB

---

## 📂 Project Structure

```bash
Banking-System/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
│
├── package.json
└── README.md
```

---

## 🔄 Transaction Flow

The application follows a ledger-based transaction system:

1. Validate Request
2. Validate Idempotency Key
3. Verify Account Status
4. Check Available Balance
5. Create Pending Transaction
6. Create Debit Ledger Entry
7. Create Credit Ledger Entry
8. Mark Transaction Completed
9. Commit Database Transaction
10. Send Response

This approach ensures consistency and prevents duplicate transfers.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/Banking-System.git
cd Banking-System
```

### Install Backend Dependencies

```bash
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
```

---

## ▶️ Run Application

### Start Backend

```bash
npm run dev
```

### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 📸 Screenshots

Add screenshots of:

* Login Page
* Register Page
* Dashboard
* Account Management
* Transfer Funds
* Transaction History

---

## 🎯 What I Learned

Through this project I gained hands-on experience with:

* REST API Development
* JWT Authentication
* MongoDB Transactions
* Ledger-Based Accounting Systems
* React State Management
* Frontend ↔ Backend Integration
* Error Handling & Debugging
* Tailwind CSS UI Development
* Git & GitHub Workflow

---

## 🚀 Future Improvements

* Role-Based Access Control (RBAC)
* Admin Dashboard
* Pagination & Search
* Account Statements (PDF Export)
* Email Notifications
* Redis Caching
* Docker Deployment
* CI/CD Pipeline
* Unit & Integration Testing
* Microservice Architecture

---

## 👨‍💻 Author

**Ashish Kumar**

Aspiring Software Engineer | Full-Stack Developer

GitHub: https://github.com/ohhaashis

---

⭐ If you found this project useful, consider giving it a star.
