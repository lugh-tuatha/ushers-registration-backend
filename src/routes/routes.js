const express = require("express");
const app = express();
const router = express.Router();

router.use("/v1/attendees", require("./attendees.routes.js"))

module.exports = router;