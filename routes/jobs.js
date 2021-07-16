import methodOverride from "method-override"
import * as jobsController from "../controllers/jobs-controller.js"
import { Router } from 'express'

const router = Router()

router.use(methodOverride('_method'))


// Jobs pages get
router.get("/", (req, res) => {jobsController.indexJobGet(req, res)})
// Handle Posting New Job
router.post("/", (req, res) => {jobsController.indexJobPost(req, res)})

//new job posting get
router.get("/post", (req, res) => {jobsController.jobPostGet(req, res)})
//job specific page
router.get("/:id", (req, res) => {jobsController.jobDetailsGet(req,res)})

//delete request for job
router.delete("/:id", (req,res) => {jobsController.jobDetailsDelete(req, res)})

//get request to edit page
router.get("/:id/edit", jobsController.jobEdit)

//update a job
router.put("/:id", jobsController.jobUpdate)

export {router}