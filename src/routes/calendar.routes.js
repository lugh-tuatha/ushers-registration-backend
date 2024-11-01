const express = require("express")
const router = express.Router()

const CalendarController = require('../controllers/calendar.controller')

router.get('/sundays/:year', CalendarController.fetchAllSundaysOfYear)

module.exports = router