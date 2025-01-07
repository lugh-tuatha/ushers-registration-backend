const mongoose = require("mongoose")
const CalendarService = require("../services/calendar.service")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

class CalendarController {
    async fetchAllSundaysWithMonthByYear(req, res){
        try {
            const sundays = await CalendarService.getAllSundaysWithMonthByYear(req.params.year)

            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                data: sundays
            })
        } catch (error) {
            
        }
    }

    async fetchAllSundaysByYear(req, res){
        try {
            const sundays = await CalendarService.getAllSundaysByYear()

            res.json({
                status: ReasonPhrases.OK,
                total_sundays: sundays.length,
                data: sundays
            })
        } catch (error) {
            
        }
    }
}

module.exports = new CalendarController()