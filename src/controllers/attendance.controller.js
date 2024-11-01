const mongoose = require("mongoose")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const Attendance = require("../models/attendance.model")
const Attendees = require("../models/attendees.model")

class AttendanceController {
    async fetchAllAttendance(req, res) {
        try {
            const response = await Attendance.find()

            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                data: response
            })
        } catch (error) {
            res.status(StatusCodes.NOT_FOUND).json({
                status: ReasonPhrases.NOT_FOUND,
                error
            })
        }
    }

    async fetchAttendanceByAttendee(req, res) {
        try {
            const response = await Attendance.where({ attendee_id: req.params.attendee })

            console.log(req.params.attendee)

            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                data: response
            })
        } catch (error) {
            
        }
    }

    async fetchAttendanceByType(req, res) {
        try {
            const response = await Attendance.where({ attendance_type: req.params.type })
            
            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                data: response
            })
        } catch (error) {
            res.status(StatusCodes.NOT_FOUND).json({
                status: ReasonPhrases.NOT_FOUND,
                error
            })
        }
    }

    async insertNewAttendee(req, res) {
        try {
            const response = await Attendance.create(req.body)

            res.status(StatusCodes.CREATED).json({
                status: ReasonPhrases.CREATED,
                data: response
            })
        } catch (error) {
            res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                status: ReasonPhrases.UNPROCESSABLE_ENTITY,
                error
            })
        }
    }


}

module.exports = new AttendanceController()