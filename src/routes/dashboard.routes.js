const express = require('express');
const router = express.Router();

const DashboardControllers = require("../controllers/dashboard.controller")

router.get("/metrics", DashboardControllers.fetchDashboardMetrics)

module.exports = router