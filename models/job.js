export {
    Job,
}

import mongoose from "mongoose"
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
