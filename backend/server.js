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

// Import employee routes
const employeeRoutes = require('./routes/employeeRoutes');

// Use employee routes
app.use('/employee', employeeRoutes);

// Main route
app.get('/', (req, res) => {
  res.send("Backend is running 🚀");
});

// Export for Vercel
module.exports = app;

// Local testing only
const PORT = process.env.PORT || 5001;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}