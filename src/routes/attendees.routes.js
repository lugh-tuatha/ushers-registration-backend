const express = require('express');
const router = express.Router();

const AttendeesController = require("../controllers/attendees.controller")

router.get("/", AttendeesController.fetchAllAttendees)
router.post("/", AttendeesController.registerAttendees)
router.put("/:id", AttendeesController.editAttendeesProfile)
router.delete("/:id", AttendeesController.deleteAttendeesProfile)

module.exports = router