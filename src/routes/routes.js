const express = require("express");
const router = express.Router();

router.use("/v1/attendees", require("./attendees.routes.js"))
router.use("/v1/calendar", require("./calendar.routes.js"))
router.use('/v1/attendance', require("./attendance.routes.js"))
router.use('/v1/maintenance/leaders', require("./leaders.routes.js"))
router.use("/v1/report", require("./report.routes.js"))
router.use("/v1/dashboard", require("./dashboard.routes.js"))

module.exports = router;