import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [role, setRole] = useState('employee');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api('/api/auth/register', 'POST', {
        name,
        email,
        password,
        role,
        employeeId,
      });
      alert('Registered');
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Register</h3>
        <form onSubmit={submit}>
          <input
            className="form-control my-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control my-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control my-2"
            placeholder="Employee ID (EMP001)"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
          <select
            className="form-control my-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
          <input
            type="password"
            className="form-control my-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-success">Register</button>
        </form>
      </div>
    </div>
  );
}
