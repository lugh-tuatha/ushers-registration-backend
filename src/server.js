// external dependencies
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const mongoosse = require("mongoose");
require("dotenv").config();

// internal dependencies 
const connectDB = require("./config/db")

const app = express();
app.use(express.json());
app.use(cors());

connectDB()

app.use("/api", require("./routes/routes"))

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log('Server Started at ' + `http://localhost:${process.env.PORT}/`.blue.underline)
})
