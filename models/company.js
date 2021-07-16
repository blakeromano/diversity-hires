export {
    Company,
}

import mongoose from "mongoose"
import { Job } from "./job.js"
const Schema = mongoose.Schema

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    missionStatement: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    ceo: {
        type: String,
        required: true,
    },
    founded: {
        type: Number,
        required: true,
    },
    companySize: {
        type: String,
        enum: ["100", "500", "1000", "5000", "10000", "10001"],
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: "Job"
    }]

}, { timestamps: true})

const Company = mongoose.model("Company", companySchema)