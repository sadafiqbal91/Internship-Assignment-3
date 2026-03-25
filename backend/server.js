require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ✅ Routes
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);

// Test route
app.get('/', (req, res) => {
  res.send("Backend is running 🚀");
});

module.exports = app;