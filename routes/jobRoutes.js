
import express from "express"
import mongoose from "mongoose"
import {Job} from "../models/job.js"
import methodOverride from "method-override"
const jobRoutes = express.Router()

jobRoutes.use(methodOverride('_method'))


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
jobRoutes.get("/post", (req, res) => {res.render("newjob", { title: "Post Job"})})
//job specific page
jobRoutes.get("/:id", (req, res) => {
    const id = req.params.id
    Job.findById(id)
    .then(result => {
        res.render("job-details", { title: "Job Details", job: result})
    })
    .catch(err=> {
        console.log(err)
    })
})

//delete request for job
jobRoutes.delete("/:id", (req,res) => {
    const id = req.params.id

    Job.findByIdAndDelete(id)
    .then(result => {
        res.redirect("/jobs")
    })
    .catch(err => console.log(err))
})

export {jobRoutes}