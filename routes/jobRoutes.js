
import express from "express"
import mongoose from "mongoose"
import {Job} from "../models/job.js"
const jobRoutes = express.Router()



// Jobs pages get
jobRoutes.get("/", (req, res) => {
    Job.find().sort({ createdAt: -1 })
    .then(result => {
        res.render("index" , { title: "All Jobs", jobs: result })
    })
    .catch(err => {
        console.log(err)
    })
})
// Handle Posting New Job
jobRoutes.post("/", (req, res) => {
    const job = new Job(req.body)

    job.save()
    .then((result) => {
        res.redirect("/jobs")
    })
    .catch((err) => {
        console.log(err)
    })
})

//new job posting get
jobRoutes.get("/post", (req, res) => {
    res.render("newjob", { title: "Post Job"})
})

export {jobRoutes}