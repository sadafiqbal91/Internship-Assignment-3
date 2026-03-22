import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="container" style={{ paddingBottom: 0 }}>
          <header className="header">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1>EmployeeSync™</h1>
            </Link>
            <nav style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/" className="btn btn-secondary">
                <Users size={18} />
                Directory
              </Link>
              <Link to="/add" className="btn btn-primary">
                <UserPlus size={18} />
                Add Employee
              </Link>
            </nav>
          </header>
        </div>
        
        <main className="container" style={{ paddingTop: '1rem' }}>
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/add" element={<EmployeeForm />} />
            <Route path="/edit/:id" element={<EmployeeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
