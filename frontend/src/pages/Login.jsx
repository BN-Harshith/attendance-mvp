import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await api('/api/auth/login', 'POST', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      if (data.role === 'manager') {
        navigate('/manager');
      } else {
        navigate('/employee');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3>Login</h3>
        <form onSubmit={submit}>
          <input
            className="form-control my-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control my-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100 mt-2">Login</button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?
          <a href="/register" className="text-primary fw-bold"> Register</a>
        </p>
      </div>
    </div>
  );
}
