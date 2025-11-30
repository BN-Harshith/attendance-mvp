import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'

export default function EmployeeDashboard(){
  const [status, setStatus] = useState(null)
  const [history, setHistory] = useState([])
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => { 
    if (!token) navigate('/'); 
    fetchHistory() 
  }, [])

  const fetchHistory = async () => {
    try {
      const list = await api('/api/attendance/my-history', 'GET', null, token);
      setHistory(list);

      // derive today's status
      const today = new Date();
      const ymd = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
      const t = list.find(i => i.date === ymd);

      setStatus(
        t?.checkInTime 
          ? (t.checkOutTime ? 'Checked Out' : 'Checked In') 
          : 'Not Checked In'
      );

    } catch (err) { 
      alert(err.message); 
    }
  }

  const checkIn = async () => { 
    try { 
      await api('/api/attendance/checkin', 'POST', null, token); 
      await fetchHistory(); 
    } catch (e) { alert(e.message); } 
  }

  const checkOut = async () => { 
    try { 
      await api('/api/attendance/checkout', 'POST', null, token); 
      await fetchHistory(); 
    } catch (e) { alert(e.message); } 
  }

  return (
    <div>
      <h3>Employee Dashboard</h3>
      <p>Today's status: <strong>{status}</strong></p>

      <button className="btn btn-primary me-2" onClick={checkIn}>Check In</button>
      <button className="btn btn-secondary" onClick={checkOut}>Check Out</button>

      <h5 className="mt-4">Recent Attendance</h5>

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
          {history.map(h => (
            <tr key={h._id}>
              <td>{h.date}</td>
              <td>{h.checkInTime ? new Date(h.checkInTime).toLocaleTimeString() : '-'}</td>
              <td>{h.checkOutTime ? new Date(h.checkOutTime).toLocaleTimeString() : '-'}</td>
              <td>{h.totalHours || '-'}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}
