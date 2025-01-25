const mongoose = require("mongoose")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const Attendance = require("../models/attendance.model")
const AttendanceServices = require("../services/attendance.service")

class ReportControllers {
    async fetchWeeklyAttendanceSummary(req, res){
        try {
            const { attendance_type, week_no } = req.query

            const attendees = await AttendanceServices.getAttendanceByTypeAndWeekNo(attendance_type, week_no)
            const attendeesCount = await Attendance.countDocuments(req.query)

            const regulars = AttendanceServices.filterByMemberStatus(attendees, 'Regular Attendees')
            const disciples = AttendanceServices.filterByMemberStatus(attendees, 'Regular Disciple')
            const startup = AttendanceServices.filterByMemberStatus(attendees, 'Regular Startup')
            const backToLife = AttendanceServices.filterByMemberStatus(attendees, 'Back to Life')
            const children = AttendanceServices.filterByMemberStatus(attendees, 'Children')

            const firstTimers = AttendanceServices.filterByMemberStatus(attendees, 'first-timer')
            const secondTimers = AttendanceServices.filterByMemberStatus(attendees, 'second-timer')
            const thirdTimers = AttendanceServices.filterByMemberStatus(attendees, 'third-timer')
            const fourthTimers = AttendanceServices.filterByMemberStatus(attendees, 'fourth-timer')

            const totalVips = [firstTimers.length, secondTimers.length, thirdTimers.length, fourthTimers.length]
                .reduce((total, current) => total + current, 0);
            const totalRegulars = attendeesCount - totalVips
            
            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                total_attendees: attendeesCount,
                total_regulars: totalRegulars,
                attendees: [
                    {
                        member_status: "Regular Disciple",
                        count: disciples.length,
                        change_percentage: "-",
                    },
                    {
                        member_status: "Regular Attendees",
                        count: regulars.length,
                        change_percentage: "-",
                    },
                    {
                        member_status: "Regular Startup",
                        count: startup.length,
                        change_percentage: "-",
                    },
                    {
                        member_status: "Back to Life",
                        count: backToLife.length,
                        change_percentage: "-",
                    },
                    {
                        member_status: "Children",
                        count: children.length,
                        change_percentage: "-",
                    },
                ],
                total_vips: totalVips,
                vips:  [
                    { 
                        member_status: "First Timer",
                        count: firstTimers.length, 
                        change_percentage: "-",
                    },
                    { 
                        member_status: "Second Timer",
                        count: secondTimers.length, 
                        change_percentage: "-",
                    },
                    { 
                        member_status: "Third Timer",
                        count: thirdTimers.length, 
                        change_percentage: "-",
                    },
                    { 
                        member_status: "Fourth Timer",
                        count: fourthTimers.length, 
                        change_percentage: "-",
                    },
                ],
            })
        } catch (error) {
            res.status(StatusCodes.NOT_FOUND).json({
                status: ReasonPhrases.NOT_FOUND,
                error
            })
        }
    }
}

module.exports = new ReportControllers()