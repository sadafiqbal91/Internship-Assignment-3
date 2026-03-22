import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as api from '../api';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    salary: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const loadEmployee = async () => {
        try {
          const { data } = await api.getEmployee(id);
          setFormData({
            name: data.name,
            role: data.role,
            department: data.department,
            salary: data.salary
          });
        } catch (err) {
          alert('Failed to load employee data');
          navigate('/');
        }
      };
      loadEmployee();
    }
  }, [id, navigate, isEditing]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.salary || isNaN(formData.salary) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Valid positive salary is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = { ...formData, salary: Number(formData.salary) };
      if (isEditing) {
        await api.updateEmployee(id, payload);
      } else {
        await api.createEmployee(payload);
      }
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
        {isEditing ? 'Edit Employee' : 'Add New Employee'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          {errors.name && <div className="error-text">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="role">Job Role</label>
          <input
            type="text"
            id="role"
            name="role"
            className="form-control"
            value={formData.role}
            onChange={handleChange}
            placeholder="Software Engineer"
          />
          {errors.role && <div className="error-text">{errors.role}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            name="department"
            className="form-control"
            value={formData.department}
            onChange={handleChange}
            placeholder="Engineering"
          />
          {errors.department && <div className="error-text">{errors.department}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="salary">Annual Salary ($)</label>
          <input
            type="number"
            id="salary"
            name="salary"
            className="form-control"
            value={formData.salary}
            onChange={handleChange}
            placeholder="80000"
            min="0"
          />
          {errors.salary && <div className="error-text">{errors.salary}</div>}
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : (isEditing ? 'Update Employee' : 'Create Employee')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
