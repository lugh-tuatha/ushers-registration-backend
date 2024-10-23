const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const AttendeesSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        age: Number,
        status: String,
        address: String,
        church_roles: String,
        church_heirarchy: String,
        assigned_leader: String,
        is_leader: Boolean,
    },
    {
        timestamps: true,
        collection: "attendees",
    }
);

const Attendees = model('Attendees', AttendeesSchema);

module.exports = Attendees;