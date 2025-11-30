import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

export default function ManagerDashboard() {
  const [list, setList] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchAll = async () => {
    try {
      const data = await api('/api/attendance/all', 'GET', null, token);
      setList(data);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    if (!token) navigate('/');
    fetchAll();
  }, []);

  return (
    <div>
      <h3>Manager Dashboard</h3>
      <p>Total records: {list.length}</p>
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>EmpID</th>
            <th>Date</th>
            <th>CheckIn</th>
            <th>CheckOut</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r._id}>
              <td>{r.userId?.name}</td>
              <td>{r.userId?.employeeId}</td>
              <td>{r.date}</td>
              <td>
                {r.checkInTime
                  ? new Date(r.checkInTime).toLocaleTimeString()
                  : '-'}
              </td>
              <td>
                {r.checkOutTime
                  ? new Date(r.checkOutTime).toLocaleTimeString()
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
