import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed ❌");
    }
  };

  return (
    <div>
      <h2>Employee List</h2>

      {employees.map((emp) => (
        <div key={emp._id}>
          {emp.name} - {emp.role} - {emp.salary}
          <button onClick={() => handleDelete(emp._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}