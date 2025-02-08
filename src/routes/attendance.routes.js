const express = require('express');
const router = express.Router();

const AttendanceController = require('../controllers/attendance.controller');
const attendanceController = require('../controllers/attendance.controller');

router.get("/", AttendanceController.fetchAllAttendance)
router.post("/", AttendanceController.insertNewAttendee)
router.get("/attendee/:attendee", AttendanceController.fetchAttendanceByAttendeeId)
router.get("/week-number/:week_number", attendanceController.fetchAttendanceByWeekNumber)
router.get("/type/:type/status/:status", AttendanceController.fetchAttendanceByMemberStatus)
router.get("/:attendance_type/:church_hierarchy/week/:week_no", AttendanceController.fetchFilteredAttendance)

module.exports = router