const mongoose = require("mongoose")
const moment = require("moment")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const Attendance = require("../models/attendance.model")
const AttendanceServices = require("../services/attendance.service")

class AttendanceController {
    async fetchAllAttendance(req, res) {
        try {
            const response = await Attendance.find()
                .populate({path: 'attendee', select: [
                    'first_name', 
                    'last_name', 
                    'primary_leader', 
                    'primary_leader', 
                    'church_process',
                    'member_status',
                ]})

            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                total_first_timer: 6,
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

            console.log(timeOnly)

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

    async fetchAttendanceByTypeAndWeekNo(req, res) {
        try {
            const { type } = req.params
            const weekNumber = req.query.week_no 

            const response = await AttendanceServices.getAttendanceByTypeAndWeekNo(type, weekNumber)
            
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
            
            console.log(moment().year(2024).startOf('year').add(weekNumber, 'week').day(0))  

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

    async fetchAttendanceReport(req, res) {
        try {
            const { type } = req.params
            const weekNumber = req.query.week_no 
            
            const attendanceData = await AttendanceServices.getAttendanceByTypeAndWeekNo(type, weekNumber)

            const firstTimers = AttendanceServices.filterByMemberStatus(attendanceData, 'First Timer')
            const secondTimers = AttendanceServices.filterByMemberStatus(attendanceData, 'Second Timer')
            const thirdTimers = AttendanceServices.filterByMemberStatus(attendanceData, 'Third Timer')
            const fourthTimers = AttendanceServices.filterByMemberStatus(attendanceData, 'Fourth Timer')

            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                attendees: attendanceData.length,
                attendees_change_percentage: 100,
                average_attendees: attendanceData.length,
                average_attendees_change_percentage: 100,
                vips: {
                    first_timer: { count: firstTimers.length, change_percentage: 100 },
                    second_timer: { count: secondTimers.length, change_percentage: 100 },
                    third_timer: { count: thirdTimers.length, change_percentage: 100 },
                    fourth_timer: { count: fourthTimers.length, change_percentage: 100 },
                }
            })
        } catch (error) {
            res.status(StatusCodes.NOT_FOUND).json({
                status: ReasonPhrases.NOT_FOUND,
                error
            })
        }
    }
}

module.exports = new AttendanceController()