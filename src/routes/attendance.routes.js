const express = require('express');
const router = express.Router();

const AttendanceController = require('../controllers/attendance.controller')

router.get("/", AttendanceController.fetchAllAttendance)
router.get("/attendee/:attendee", AttendanceController.fetchAttendanceByAttendee)
router.get("/type/:type", AttendanceController.fetchAttendanceByType)
router.post("/", AttendanceController.insertNewAttendee)

module.exports = router