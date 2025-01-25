const express = require('express');
const router = express.Router();

const ReportControllers = require("../controllers/report.controller")

router.get("/weekly-attendance-summary", ReportControllers.fetchWeeklyAttendanceSummary)

module.exports = router