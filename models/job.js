const mongoose = require("mongoose")
const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    // bug with number of positions and app link for now
    numOfPositions: {
        type: String,
        required: true
    },
    applicationLink: {
        type: String,
        required: true
    },
}, { timestamps: true})

const Job = mongoose.model("Job", jobSchema)

module.exports = Job