# 🗳️ Project Title: Votexus – College Clubs Voting System

## 📄 Description

**Votexus** is a full-stack web application designed to streamline the electoral process for college clubs and sub-clubs. It provides a secure and user-friendly platform for students to register, nominate as candidates, and vote for various positions across multiple clubs. The system ensures a **one-person-one-vote** policy and maintains **transparency** with real-time result display.

---

## 🔧 Tech Stack 

- **Frontend**: React.js, React Router, Redux, Axios  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Version Control**: Git & GitHub  
- **Deployment**: Netlify (Frontend), Render (Backend)

---

## ✨ Key Features

- User registration and login  
- Admin-controlled candidate approval and election management  
- Role-based access (voters and admins)  
- Secure voting with eligibility checks  
- Dynamic club and sub-club management  
- Live results display after voting ends  
- Responsive and modern UI/UX

---

## 🎯 Purpose

To digitize and secure the voting process in educational institutions, eliminate paper-based voting, and ensure fairness and transparency in student elections.

---

## 🚀 How to Run the Votexus Project Locally

### 🧱 Prerequisites

- Node.js and npm installed  
- MongoDB connection string (MongoDB Atlas or local)  
- `.env` files configured for both `client` and `server`

---

### 📁 Folder Structure

collage-voting-system-project/
├── client/ # React frontend
├── server/ # Node.js backend
└── .env # Environment variables (optional in root)


---

### 🖥️ 1. Clone the Repository

```bash
git clone https://github.com/reddy-gowthami/Votexus.git
cd collage-voting-system-project 
```

🗝️ 2. Set Up Environment Variables
Inside the server/ directory, create a .env file:
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Replace values with your actual MongoDB URI and a secure secret key.
📦 3. Install Dependencies
Backend:
```bash
cd server
npm install 
```
Frontend:

```bash
cd ../client
npm install
```
🏃 4. Run the Project
✅ Start the frontend:

```bash
npm start
```
✅ In another terminal, start the backend:

```bash
cd server
npm run dev
```
🌐 Running URLs (Localhost)
Frontend: http://localhost:3000

Backend: http://localhost:5000

📌 Note
Make sure all required .env variables are properly set up, and both frontend and backend servers are running in separate terminals.
