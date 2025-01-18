const express = require('express');
const router = express.Router();

const LeadersControllers = require("../controllers/leaders.controller")

router.get("/", LeadersControllers.fetchAllLeaders)

module.exports = router