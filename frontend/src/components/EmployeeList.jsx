import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  // Form state
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5003/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  // Add employee
  const addEmployee = async () => {
    if (!name || !role || !salary) {
      alert("All fields required ❌");
      return;
    }

    try {
      await axios.post("http://localhost:5003/employees", {
        name,
        role,
        salary,
      });

      setName("");
      setRole("");
      setSalary("");
      fetchEmployees();
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  // Edit employee
  const editEmployee = (emp) => {
    setEditingId(emp._id);
    setName(emp.name);
    setRole(emp.role);
    setSalary(emp.salary);
  };

  // Update employee
  const updateEmployee = async () => {
    if (!name || !role || !salary) {
      alert("All fields required ❌");
      return;
    }

    try {
      await axios.put(`http://localhost:5003/employees/${editingId}`, {
        name,
        role,
        salary,
      });

      setEditingId(null);
      setName("");
      setRole("");
      setSalary("");
      fetchEmployees();
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };

  // Delete employee
  const deleteEmp = async (id) => {
    try {
      await axios.delete(`http://localhost:5003/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h2>Employee Management</h2>

      {/* Form */}
      <div className="form-container">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Role"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            placeholder="Salary"
            className="form-control"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={editingId ? updateEmployee : addEmployee}
        >
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </div>

      {/* Employee List */}
      <h3>Employee List</h3>

      {employees.length === 0 ? (
        <p>No employees found ❌</p>
      ) : (
        <div className="grid">
          {employees.map((emp) => (
            <div className="card" key={emp._id}>
              <div className="employee-info">
                <h3>{emp.name}</h3>
                <p>Role: {emp.role}</p>
                <p>Salary: ${emp.salary}</p>
              </div>

              <div className="card-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => editEmployee(emp)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteEmp(emp._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}