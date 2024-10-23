const mongoose = require("mongoose")
const Attendees = require("../models/attendees.models")

class AttendeesController {
    async fetchAllAttendees(req, res){
        try {
            const data = await Attendees.find()
            res.status(200).json({
                status: "Successfully Retrived Data",
                results: data.length,
                data
            })
        } catch (error) {
            res.status(404).json({
                status: "Failed to Retrived Data",
                error
            })
        }
    }

    async registerAttendees(req, res){
        try {
            const registerAttendees = await Attendees.create(req.body)
            console.log(req)
            res.status(201).json({
                status: "Created Successfully",
                data: registerAttendees
            })
        } catch (error) {
            res.status(422).json({
                status: "Failed to register Attendees",
                error,
            })
        }
    }

    async editAttendeesProfile(req, res){
        const id = req.params.id;
        const updatedData = req.body;
        console.log(updatedData)
        try {
            const updateAttendeesProfile = await Attendees.findByIdAndUpdate(id, updatedData, {
                new: true,
            })

            res.status(200).json({
                status: "Attendees Profile Updated Successfully",
                data: updateAttendeesProfile,
            })
        } catch (error) {
            res.status(404).json({
                status: "Cannot Find Attendees Profile",
                error,
            })
        }
    }

    async deleteAttendeesProfile(req, res){
        const id = req.params.id;

        try {
            const deleteAttendeesProfile = await Attendees.findByIdAndDelete(id)

            res.status(410).json({
                status: "Deleted Successfully",
            })
        } catch (error) {
            res.status(404).json({
                status: "Cannot Find Attendees Profile",
                error,
            })
        }
    }
}

module.exports = new AttendeesController()