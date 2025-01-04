const mongoose = require("mongoose");
const {Schema, model} = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendees:
 *       type: object
 *       description: Schema representing an attendee's details.
 *       properties:
 *         _id:
 *           type: String
 *           description: A unique id auto-generated for the attendee.
 *         first_name:
 *           type: String
 *           description: The first name of the attendee.
 *         last_name:
 *           type: String
 *           description: The last name of the attendee.
 *         age:
 *           type: Number
 *           description: The age of the attendee.
 *         address:
 *           type: String
 *           description: The address of the attendee.
 *         network:
 *           type: String
 *           description: The attendee's network or role within the community.
 *         church_hierarchy: 
 *           type: String
 *           description: The hierarchical role of the attendee within the church.
 *         primary_leader: 
 *           type: String
 *           description: The name of the attendee's primary leader within the church.
 *         is_leader:
 *           type: boolean
 *           description: Indicates if the attendee holds a leadership position within the church.
 *         church_process:
 *           type: String
 *           description: The ministry or process the attendee is currently involved in within the church.
 *         member_status:
 *           type: String
 *           description: The membership status of the attendee.
 *         invited_by:
 *           type: String
 *           description: The The person who invited this attendee.
 *       example:
 *         _id: 6721f4b1e2ea6466ce0b227c
 *         first_name: Justin
 *         last_name: Egonia
 *         age: 37
 *         address: 643 3rd Floor Reten St. Samapaloc Manila
 *         network: Husband
 *         church_hierarchy: Elder
 *         primary_leader: Ps. Alip Aspiras
 *         is_leader: false
 *         church_process: Pastoral Ministry
 *         member_status: Regular Disciple
 *         invited_by: Ps. Alip Aspiras
 */
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
        church_process: String,
        member_status: String,
        invited_by: String
    },
    {
        timestamps: true,
        collection: "attendees",
    }
);

const Attendees = model('Attendees', AttendeesSchema);

module.exports = Attendees;