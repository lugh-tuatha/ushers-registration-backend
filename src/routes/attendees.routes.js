const express = require('express');
const router = express.Router();

const AttendeesController = require("../controllers/attendees.controller")

router.get("/", AttendeesController.fetchAllAttendees)
router.get("/:id", AttendeesController.fetchAttendeeById)
router.get("/network_leader/:network_leader", AttendeesController.fetchAttendeesByNetworkLeader)
router.get("/leader/all", AttendeesController.fetchLeaderAttendees)
router.post("/", AttendeesController.registerAttendee)
router.put("/:id", AttendeesController.editAttendeesProfile)
router.delete("/:id", AttendeesController.deleteAttendeesProfile)

module.exports = router