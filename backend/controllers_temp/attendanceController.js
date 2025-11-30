const Attendance = require('../models/Attendance');
const User = require('../models/User');

const toYMD = (d = new Date()) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

exports.checkIn = async (req, res) => {
  try {
    const user = req.user;
    const today = toYMD();

    let att = await Attendance.findOne({ userId: user._id, date: today });

    if (att && att.checkInTime)
      return res.status(400).json({ message: 'Already checked in' });

    if (!att) {
      att = new Attendance({
        userId: user._id,
        date: today,
        checkInTime: new Date(),
        status: 'present'
      });
    } else {
      att.checkInTime = new Date();
    }

    await att.save();
    res.json(att);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const user = req.user;
    const today = toYMD();

    let att = await Attendance.findOne({ userId: user._id, date: today });

    if (!att || !att.checkInTime)
      return res.status(400).json({ message: 'Not checked in yet' });

    if (att.checkOutTime)
      return res.status(400).json({ message: 'Already checked out' });

    att.checkOutTime = new Date();

    const hours =
      (att.checkOutTime - att.checkInTime) / (1000 * 60 * 60);
    att.totalHours = Number(hours.toFixed(2));

    await att.save();
    res.json(att);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.myHistory = async (req, res) => {
  try {
    const user = req.user;
    const list = await Attendance.find({ userId: user._id }).sort({ date: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.allAttendance = async (req, res) => {
  try {
    if (req.user.role !== 'manager')
      return res.status(403).json({ message: 'Forbidden' });

    const { employeeId, date, status } = req.query;
    const filter = {};

    if (date) filter.date = date;

    if (employeeId) {
      const user = await User.findOne({ employeeId });
      if (user) filter.userId = user._id;
      else return res.json([]);
    }

    if (status) filter.status = status;

    const list = await Attendance.find(filter).populate(
      'userId',
      'name email employeeId department'
    );

    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
