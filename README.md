# Employee Management System (MERN Stack)

Welcome to the full-stack Employee Management System! This project allows you to seamlessly map, add, edit, and delete employee records using a modern React frontend and a Node.js Express backend. 

## 🚀 Tech Stack
- **Frontend**: React (Vite), React Router DOM, Axios, Lucide-React, Custom CSS
- **Backend**: Node.js, Express, Mongoose, CORS, Dotenv
- **Database**: MongoDB (Local or Atlas)

## 📁 Project Structure

This project is divided into two main directories:
- `/frontend` - Contains the React Vite application
- `/backend` - Contains the Node.js API and MongoDB Models

## ⚙️ Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (Or provide a MongoDB Atlas URI)

## 🛠️ Installation & Setup

Please follow these steps to run the project locally on your machine.

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd project-directory
```

### 2. Backend Setup
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Make sure your MongoDB server is running locally on port `27017`. You can also create a `.env` file in the `backend` folder and add your own MongoDB URI:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employee-management
```

Start the backend server:
```bash
npm start
# or
node server.js
```
The backend API will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The frontend UI will run on `http://localhost:5173`.

## 📸 Usage
Once both servers are running:
1. Open your browser and go to `http://localhost:5173`.
2. Add a new employee using the "Add Employee" form.
3. View, Edit, or Delete employees directly from the dashboard.

***
*Developed as part of the Internship Assignment*
