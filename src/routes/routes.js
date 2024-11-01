const express = require("express");
const router = express.Router();

router.use("/v1/attendees", require("./attendees.routes.js"))
router.use("/v1/calendar", require("./calendar.routes.js"))
router.use('/v1/attendance', require("./attendance.routes.js"))

module.exports = router;