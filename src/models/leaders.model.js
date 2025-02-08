const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const LeaderSchema = new Schema(
    {
        first_name: String,
        last_name: String,
        type: String,
        disciples_count: Number
    },
    {
        timestamps: true,
        collection: "leaders",
    }
)

const Leaders = model('Leaders', LeaderSchema);

module.exports = Leaders;