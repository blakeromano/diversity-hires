export {
    Company,
}

import mongoose from "mongoose"
import { Job } from "./job.js"
import { Profile } from "./profile.js"
const Schema = mongoose.Schema

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
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
        enum: ["Small >100", "Medium 101-1000", "Large 1001-10000", "Extra-Large 10001+"],
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: "Job"
    }],
    userPosted: {
        type: Schema.Types.ObjectId,
        ref: Profile,
        required: true,
    },

}, { timestamps: true})

const Company = mongoose.model("Company", companySchema)