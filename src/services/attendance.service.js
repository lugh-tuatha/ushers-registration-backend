const mongoose = require('mongoose')

const Attendance = require("../models/attendance.model")

class AttendanceServices {
    getAttendanceByTypeAndWeekNo(type, weekNumber) {
        try {
            const data = Attendance.where(weekNumber ? { 
                attendance_type: type,
                week_no: weekNumber
            } : { attendance_type: type })
            .populate({path: 'attendee', select: [
                'first_name', 
                'last_name', 
                'primary_leader', 
                'church_process',
                'member_status',
            ]}).sort({ time_in: -1 })

            return data
        } catch (error) {
            console.log(first)
        }
    }
}

module.exports = new AttendanceServices()