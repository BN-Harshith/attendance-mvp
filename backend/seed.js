require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Attendance = require('./models/Attendance');
const connectDB = require('./config/db');

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    await User.deleteMany();
    await Attendance.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash('password123', salt);

    const manager = await User.create({
      name: 'Manager One',
      email: 'manager@org.com',
      password: pwd,
      role: 'manager',
      employeeId: 'MGR001',
    });

    const emp1 = await User.create({
      name: 'Emp One',
      email: 'emp1@org.com',
      password: pwd,
      role: 'employee',
      employeeId: 'EMP001',
    });

    const emp2 = await User.create({
      name: 'Emp Two',
      email: 'emp2@org.com',
      password: pwd,
      role: 'employee',
      employeeId: 'EMP002',
    });

    // create some attendance sample
    const today = new Date();
    const ymd = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(today.getDate()).padStart(2, '0')}`;

    await Attendance.create({
      userId: emp1._id,
      date: ymd,
      checkInTime: new Date(),
      checkOutTime: null,
      status: 'present',
    });

    console.log('Seed complete');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
