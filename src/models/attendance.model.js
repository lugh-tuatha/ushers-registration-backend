const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const AttendanceSchema = new Schema(
    {
        week_no: Number,
        time_in: Date,
        attendee: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Attendees'
        },
        attendance_type: String,
    },
    {
        timestamps: true,
        collection: "attendance"
    }
);

const Attendance = model('Attendance', AttendanceSchema)

module.exports = Attendance;