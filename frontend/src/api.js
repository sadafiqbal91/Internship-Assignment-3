import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5003/employees", // ✅ updated port
});

export const getEmployees = () => API.get("/");
export const addEmployee = (data) => API.post("/", data);
export const deleteEmployee = (id) => API.delete(`/${id}`);