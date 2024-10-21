// external dependencies
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const mongoosse = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());

// const 

const mongoUrl = process.env.MONGO_URL;

app.use("/api", require("./routes/routes"))

app.listen(process.env.PORT, () => {
    console.log('Server Started at ' + `http://localhost:${process.env.PORT}/`.blue.underline)
})
