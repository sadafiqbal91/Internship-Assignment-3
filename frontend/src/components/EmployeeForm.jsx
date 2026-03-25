import { useState, useEffect } from "react";
import { addEmployee, updateEmployee } from "../api";

export default function EmployeeForm({ employee, refresh, closeForm }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");

  // Pre-fill fields if editing
  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setRole(employee.role);
      setSalary(employee.salary);
    }
  }, [employee]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { name, role, salary };

    if (employee) {
      await updateEmployee(employee._id, data); // Update
    } else {
      await addEmployee(data); // Add new
    }

    setName("");
    setRole("");
    setSalary("");

    if (refresh) refresh(); // Refresh employee list
    if (closeForm) closeForm(); // Close form after submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        required
      />
      <input
        placeholder="Salary"
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
      />
      <button type="submit">{employee ? "Update" : "Add"} Employee</button>
    </form>
  );
}