const mongoose = require("mongoose")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const Attendees = require("../models/attendees.model")
/**
 * @swagger
 * tags:
 *   name: Attendees
 *   description: Attendees API
 */
class AttendeesController {
    /**
     * @swagger
     * /api/v1/attendees:
     *   get:
     *     summary: Returns the list of all the Attendees
     *     tags: [Attendees]
     *     responses: 
     *       200:
     *         description: The list of all the Attendees
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Attendees'
     */
    async fetchAllAttendees(req, res){
        try {
            const search = req.query.search || "";
            const member_status = req.query.member_status || "all";
            
            let query = {
                $or: [
                    { first_name: { $regex: search, $options: "i" } },
                    { last_name: { $regex: search, $options: "i" } }
                ]
            };
            
            if (member_status !== "all") {
                query.member_status = { $in: [member_status] };
            }
            
            const response = await Attendees.find(query).sort({ first_name: 1 });

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

    async fetchAttendeeById(req, res){
        try {
            const response = await Attendees.findById(req.params.id)

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

    async fetchAttendeesByNetworkLeader(req, res){
        try {
            const response = await Attendees.where({ primary_leader: 'Bro. Justin Egonia' })

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

    async fetchLeaderAttendees(req, res){
        try {
            const response = await Attendees.where({ is_leader: true })

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

    async registerAttendee(req, res){
        try {
            const response = await Attendees.create(req.body)

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

    async editAttendeesProfile(req, res){
        const id = req.params.id;
        const updatedData = req.body;
        
        try {
            const response = await Attendees.findByIdAndUpdate(id, updatedData, {
                new: true,
            })

            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
                data: response,
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: ReasonPhrases.INTERNAL_SERVER_ERROR,
                error
            })
        }
    }

    async deleteAttendeesProfile(req, res){
        const id = req.params.id;

        try {
            const response = await Attendees.findByIdAndDelete(id)

            res.status(StatusCodes.OK).json({
                status: ReasonPhrases.OK,
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: ReasonPhrases.INTERNAL_SERVER_ERROR,
                error
            })
        }
    }
}

module.exports = new AttendeesController()