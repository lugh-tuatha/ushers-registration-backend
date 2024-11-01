const express = require('express');
const router = express.Router();

const AttendeesController = require("../controllers/attendees.controller")

router.get("/", AttendeesController.fetchAllAttendees)
router.get("/:id", AttendeesController.fetchAttendeeById)
router.get("/leader/:network_leader", AttendeesController.fetchAttendeesByNetworkLeader)
router.post("/", AttendeesController.registerAttendee)
router.put("/:id", AttendeesController.editAttendeesProfile)
router.delete("/:id", AttendeesController.deleteAttendeesProfile)

module.exports = router