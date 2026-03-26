import axios from "axios";

// Backend URL (Vercel deployed)
const API_URL = "https://sadafiqbal-internship3.vercel.app/employees";

// Get all employees
export const getEmployees = () => axios.get(API_URL);

// Add new employee
export const addEmployee = (data) => axios.post(API_URL, data);

// Delete employee
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);

// Update employee
export const updateEmployee = (id, data) => axios.put(`${API_URL}/${id}`, data);