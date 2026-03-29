require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ FIXED CORS (ALL PORTS ALLOWED)
app.use(cors({
  origin: true, // ✅ Allows ANY origin. Solves the Vercel dynamic URL issue.
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.error("MongoDB connection error:", err));

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Backend is running! 🚀');
});

// ✅ Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  role: String,
  salary: Number
}, { timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

// ✅ GET
app.get('/employees', async (req, res) => {
  const data = await Employee.find();
  res.json(data);
});

// ✅ ADD
app.post('/employees', async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

// ✅ UPDATE
app.put('/employees/:id', async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after' }
  );
  res.json(updated);
});

// ✅ DELETE
app.delete('/employees/:id', async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted ✅" });
});

// ✅ Server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});