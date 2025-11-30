require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

app.get('/', (req, res) => res.send('Attendance API running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
