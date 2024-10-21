const express = require('express');
const router = express.Router();

const AttendeesController = require("../controllers/attendees.controller")

router.get("/", AttendeesController.fetchAllAttendees)

module.exports = router