import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Building, DollarSign, Briefcase, Mail, Users } from 'lucide-react';
import * as api from '../api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const { data } = await api.getEmployees();
      setEmployees(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch employees. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.deleteEmployee(id);
        setEmployees(employees.filter(emp => emp._id !== id));
      } catch (err) {
        alert('Failed to delete employee');
      }
    }
  };

  if (loading) return <div className="loader">Loading directory...</div>;
  if (error) return <div className="error-text" style={{ textAlign: 'center', marginTop: '2rem' }}>{error}</div>;

  return (
    <div className="fade-in">
      <div className="grid">
        {employees.length === 0 ? (
          <div className="empty-state">
            <Users size={48} style={{ color: 'var(--text-muted)' }} />
            <p>No employees found. Add some to get started!</p>
            <Link to="/add" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              Add First Employee
            </Link>
          </div>
        ) : (
          employees.map((employee) => (
            <div key={employee._id} className="card">
              <div className="employee-info">
                <h3>{employee.name}</h3>
                <p>
                  <Briefcase size={16} />
                  {employee.role}
                </p>
                <p>
                  <Building size={16} />
                  {employee.department}
                </p>
                <p style={{ color: 'var(--success)' }}>
                  <DollarSign size={16} />
                  ${employee.salary.toLocaleString()}
                </p>
              </div>
              <div className="card-actions">
                <Link to={`/edit/${employee._id}`} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                  <Edit2 size={16} />
                </Link>
                <button 
                  onClick={() => handleDelete(employee._id)} 
                  className="btn btn-danger" 
                  style={{ padding: '0.5rem', borderRadius: '50%' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
