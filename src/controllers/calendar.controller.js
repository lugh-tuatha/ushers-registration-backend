const mongoose = require("mongoose")
const CalendarService = require("../services/calendar.service")

class CalendarController {
    async fetchAllSundaysOfYear(req, res){
        try {
            const sundays = await CalendarService.getAllSundaysOfYear(req.params.year)

            res.json({
                data: sundays
            })
        } catch (error) {
            
        }
    }
}

module.exports = new CalendarController()