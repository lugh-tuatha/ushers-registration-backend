const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const AttendanceSchema = new Schema(
    {
        week_no: Number,
        time_in: Date,
        time_out: Date,
        attendee_id: String,
        attendance_type: String,
    },
    {
        timestamps: true,
        collection: "attendance"
    }
);

const Attendance = model('Attendance', AttendanceSchema)

module.exports = Attendance;