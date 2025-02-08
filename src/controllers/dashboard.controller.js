const mongoose = require("mongoose")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const Attendance = require("../models/attendance.model")
const Attendees = require("../models/attendees.model")

class DashboardControllers {
    async fetchDashboardMetrics(req, res){
        try {
            const attendeeCount = await Attendees.countDocuments()
            const regularDisciplesCount = await Attendees.find({ member_status: "Regular Disciple" }).countDocuments()
            const regularAttendeesCount = await Attendees.find({ member_status: "Regular Attendees" }).countDocuments()
            const regularStartupCount = await Attendees.find({ member_status: "Regular Startup" }).countDocuments()

            const childrenCount = await Attendees.find({ member_status: "Children" }).countDocuments()
            const backToLifeCount = await Attendees.find({ member_status: "Back to Life" }).countDocuments()

            const firstTimerCount = await Attendees.find({ member_status: "first-timer" }).countDocuments()
            const secondTimerCount = await Attendees.find({ member_status: "second-timer" }).countDocuments()
            const thirdTimerCount = await Attendees.find({ member_status: "third-timer" }).countDocuments()
            const fourthTimerCount = await Attendees.find({ member_status: "fourth-timer" }).countDocuments()

            const totalVips = [firstTimerCount, secondTimerCount, thirdTimerCount, fourthTimerCount]
                .reduce((total, current) => total + current, 0);

            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                total_attendees: attendeeCount,
                regular_disciples: regularDisciplesCount,
                regular_attendees: regularAttendeesCount,
                regular_startup: regularStartupCount,
                vips: totalVips,
                children: childrenCount,
                back_to_life: backToLifeCount,
                attendance_trends: [
                    {name: 'Jan 5, 2025', attendees: 104, pv: 2400, amt: 2400},
                    {name: 'Jan 12, 2025', attendees: 195, pv: 2400, amt: 2400},
                    {name: 'Jan 19, 2025', attendees: 193, pv: 2400, amt: 2400},
                    {name: 'Jan 26, 2025', attendees: 228, pv: 2400, amt: 2400},
                    {name: 'Feb 2, 2025', attendees: 219, pv: 2400, amt: 2400},
                ]
            })
        } catch (error) {
            res.status(StatusCodes.NOT_FOUND).json({
                status: ReasonPhrases.NOT_FOUND,
                error
            })
        }
    }
}

module.exports = new DashboardControllers()