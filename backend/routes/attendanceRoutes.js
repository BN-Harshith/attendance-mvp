const express = require('express');
const router = express.Router();

const {
  checkIn,
  checkOut,
  myHistory,
  allAttendance,
} = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkin', protect, checkIn);
router.post('/checkout', protect, checkOut);
router.get('/my-history', protect, myHistory);
router.get('/all', protect, allAttendance);

module.exports = router;
