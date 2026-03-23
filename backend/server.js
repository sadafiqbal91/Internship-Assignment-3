require('dotenv').config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(express.json());

// ✅ MongoDB URI from .env
const uri = process.env.MONGO_URI;

// ✅ MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// ✅ Connect to MongoDB
async function run() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");

    const db = client.db("employee-db");

    // Test route
    app.get('/', (req, res) => {
      res.send("Backend is running 🚀");
    });

    // ✅ Server start (only listen if not in production, e.g., Vercel)
    const PORT = process.env.PORT || 5000;
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }

  } catch (error) {
    console.error(error);
  }
}

run();

module.exports = app;