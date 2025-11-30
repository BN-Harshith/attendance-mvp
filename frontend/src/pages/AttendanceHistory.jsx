import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function AttendanceHistory() {
  const [list, setList] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    api('/api/attendance/myhistory', 'GET', null, token)
      .then(setList)
      .catch((e) => alert(e.message));
  }, []);

  return (
    <div>
      <h3>My Attendance History</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>CheckIn</th>
            <th>CheckOut</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {list.map((h) => (
            <tr key={h._id}>
              <td>{h.date}</td>
              <td>
                {h.checkInTime
                  ? new Date(h.checkInTime).toLocaleTimeString()
                  : '-'}
              </td>
              <td>
                {h.checkOutTime
                  ? new Date(h.checkOutTime).toLocaleTimeString()
                  : '-'}
              </td>
              <td>{h.totalHours || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
