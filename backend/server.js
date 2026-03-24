require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

// MongoDB connection
const client = new MongoClient(process.env.MONGO_URI);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.error(error);
  }
}
run();

// Routes
app.get('/', (req, res) => {
  res.send("Backend is running 🚀");
});

// LAST LINE (Vercel compatible)
module.exports = app;