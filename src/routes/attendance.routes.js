const express = require('express');
const router = express.Router();

const AttendanceController = require('../controllers/attendance.controller');
const attendanceController = require('../controllers/attendance.controller');

router.get("/", AttendanceController.fetchAllAttendance)
router.get("/attendee/:attendee", AttendanceController.fetchAttendanceByAttendeeId)
router.get("/type/:type", AttendanceController.fetchAttendanceByTypeAndWeekNo)
router.get("/week-number/:week_number", attendanceController.fetchAttendanceByWeekNumber)
router.post("/", AttendanceController.insertNewAttendee)
router.get("/report/type/:type", AttendanceController.fetchAttendanceReport)

module.exports = router