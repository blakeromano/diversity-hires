import methodOverride from "method-override"
import * as jobsController from "../controllers/jobs-controller.js"
import { Router } from 'express'

const router = Router()

router.use(methodOverride('_method'))


// Jobs pages get
router.get("/", (req, res) => {jobsController.index(req, res)})
// Handle Posting New Job
router.post("/", (req, res) => {jobsController.create(req, res)})

//new job posting get
router.get("/post", (req, res) => {jobsController.new(req, res)})
//job specific page
router.get("/:id", (req, res) => {jobsController.show(req,res)})

//delete request for job
router.delete("/:id", (req,res) => {jobsController.delete(req, res)})

//get request to edit page
router.get("/:id/edit", jobsController.edit)

//update a job
router.put("/:id", jobsController.update)

export {router}