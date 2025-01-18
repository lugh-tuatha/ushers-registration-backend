const mongoose = require("mongoose")
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const Leaders = require("../models/leaders.model")

class LeadersControllers {
    async fetchAllLeaders(req, res){
        try {
            const response = await Leaders.find()

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
}

module.exports = new LeadersControllers()