const { default: mongoose } = require("mongoose");
const mongoosse = require("mongoose");
require("dotenv").config();

const DB = process.env.MONGO_URL;

const connectDB = async () => {
    mongoose
        .connect(DB)
        .then(() => {
            console.log("Connected to database".cyan.underline)
        })
        .catch((error) => console.log(error))
}

module.exports = connectDB;