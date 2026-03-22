const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    role: {
        type: String,
        required: [true, 'Role is required']
    },
    department: {
        type: String,
        required: [true, 'Department is required']
    },
    salary: {
        type: Number,
        required: [true, 'Salary is required'],
        min: [0, 'Salary must be a positive number']
    }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
