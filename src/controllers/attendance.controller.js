const mongoose = require("mongoose")
const moment = require("moment")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const Attendance = require("../models/attendance.model")
const AttendanceServices = require("../services/attendance.service")

class AttendanceController {
    async fetchAllAttendance(req, res) {
        try {
            const { member_status } = req.query
            const response = await Attendance.find(req.query)
                .populate({
                    path: 'attendee', 
                    select: [
                        'first_name', 
                        'last_name', 
                        'primary_leader', 
                        'primary_leader', 
                        'church_process',
                        'member_status',
                    ]
                })
            console.log(member_status)

            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                results: response.length,
                data: response
            })
        } catch (error) {
            res.status(StatusCodes.NOT_FOUND).json({
                status: ReasonPhrases.NOT_FOUND,
                error
            })
        }
    }

    async fetchAttendanceByAttendeeId(req, res) {
        try {
            const response = await Attendance.find({attendee: req.params.attendee})

            const timeOnly = moment(response[0].time_in).format('LT')

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

    async fetchAttendanceByWeekNumber(req, res) {
        try {
            const weekNumber = req.params.week_number;
            const response = await Attendance.where({ week_no: weekNumber })
                .populate({path: 'attendee', select: [
                    'first_name', 
                    'last_name', 
                    'primary_leader', 
                    'church_process',
                    'member_status',
                ]})
            
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

    async fetchAttendanceByMemberStatus(req, res) {
        try {
            const { type, status } = req.params
            const weekNumber = req.query.week_no 

            const attendance = await AttendanceServices.getAttendanceByTypeAndWeekNo(type, weekNumber)

            const response = AttendanceServices.filterByMemberStatus(attendance, status)

            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                results: response.length,
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