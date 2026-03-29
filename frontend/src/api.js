import axios from "axios";

const API = axios.create({
  baseURL: "https://internship-assignment-3-drtz.vercel.app/employees", // ✅ updated to Vercel backend
});

export const getEmployees = () => API.get("/");
export const addEmployee = (data) => API.post("/", data);
export const deleteEmployee = (id) => API.delete(`/${id}`);