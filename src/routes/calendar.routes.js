const express = require("express")
const router = express.Router()

const CalendarController = require('../controllers/calendar.controller')

router.get('/sundays-with-month/:year', CalendarController.fetchAllSundaysWithMonthByYear)
router.get('/sundays', CalendarController.fetchAllSundaysByYear)

module.exports = router