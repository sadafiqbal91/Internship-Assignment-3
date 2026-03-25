import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employee List</h2>

      {employees.map((emp) => (
        <div key={emp._id}>
          {emp.name} - {emp.role} - {emp.salary}
          <button onClick={() => deleteEmployee(emp._id).then(fetchEmployees)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}