export {
    Job,
}

import mongoose from "mongoose"
import { Profile } from "../models/profile.js"
const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "A description was not provided, please reach out to the company for more information about the position"
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
    userPosted: {
        type: Schema.Types.ObjectId,
        ref: Profile,
        required: true,
    },
}, { timestamps: true})

const Job = mongoose.model("Job", jobSchema)