const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const AttendeesSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        age: Number,
        status: String,
        address: String,
        network: String,
        church_hierarchy: String,
        primary_leader: String,
        is_leader: Boolean,
    },
    {
        timestamps: true,
        collection: "attendees",
    }
);

const Attendees = model('Attendees', AttendeesSchema);

module.exports = Attendees;