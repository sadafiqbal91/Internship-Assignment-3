const mongoose = require('mongoose');
const uri = "mongodb+srv://Backendprofile:abc12345@cluster0.3kjsh7y.mongodb.net/employee-management?appName=Cluster0";

console.log("Testing connection...");
mongoose.connect(uri)
    .then(() => {
        console.log("SUCCESS: Connected to MongoDB Atlas!");
        process.exit(0);
    })
    .catch(err => {
        console.error("FAILED to connect:", err.message);
        process.exit(1);
    });
