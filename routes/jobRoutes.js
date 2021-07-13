import express from "express"
import methodOverride from "method-override"
import * as jobsController from "../controllers/jobsController.js"
const jobRoutes = express.Router()

jobRoutes.use(methodOverride('_method'))


// Jobs pages get
jobRoutes.get("/", (req, res) => {jobsController.indexJobGet(req, res)})
// Handle Posting New Job
jobRoutes.post("/", (req, res) => {jobsController.indexJobPost(req, res)})

//new job posting get
jobRoutes.get("/post", (req, res) => {jobsController.jobPostGet(req, res)})
//job specific page
jobRoutes.get("/:id", (req, res) => {jobsController.jobDetailsGet(req,res)})

//delete request for job
jobRoutes.delete("/:id", (req,res) => {jobsController.jobDetailsDelete(req, res)})

export {jobRoutes}