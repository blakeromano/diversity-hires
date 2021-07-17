import {Job} from "../models/job.js"
import { Profile } from "../models/profile.js"
import { User } from "../models/user.js"
import { Company } from "../models/company.js"

export {
    indexJobGet,
    indexJobPost,
    jobDetailsDelete,
    jobDetailsGet,
    jobPostGet,
    jobEdit,
    jobUpdate,
}

function indexJobGet(req,res) {
    Job.find().sort({ createdAt: -1 })
    .then(result => {
        res.render("jobs/index" , { title: "All Jobs", jobs: result, user: req.user ? req.user : null })
    })
    .catch(err => {
        console.log(err)
    })
}

function indexJobPost(req,res) {
    req.body.userPosted = req.user.profile
    if (req.body.description === "") {
        delete req.body.description
    }
    const job = new Job(req.body)
    job.save()
    .then((result) => {
        Company.find({ companyName: result.company})
        .then(company => {
            company[0].jobs.push(result._id)
            company[0].save()
            .then(() => {
                Profile.findById(req.user.profile)
                .then(profile => {
                    profile.jobsPosted.push(result._id)
                    profile.save()
                    // .then(() => {
                        res.redirect("/jobs")
                    // })
                    // .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch((err) => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch((err) => {
        console.log(err)
    })
}

function jobDetailsGet(req,res) {
    const id = req.params.id
    Job.findById(id)
    .then(result => {
        res.render("jobs/show", { title: "Job Details", job: result, user: req.user ? req.user : null })
    })
    .catch(err=> {
        console.log(err)
    })
}

function jobDetailsDelete(req,res) {
    const id = req.params.id

    Job.findByIdAndDelete(id)
    .then(result => {
        res.redirect("/jobs")
    })
    .catch(err => console.log(err))
}

function jobPostGet(req,res) {
    Company.find({})
    .then(companies => {
        res.render("jobs/create", { title: "Post Job", companies: companies, user: req.user ? req.user : null })
    })
    .catch(err => console.log(err))
}

function jobEdit(req, res) {
    Job.findById(req.params.id)
    .then(job => {
        res.render("jobs/edit", { title: "Edit Job", job: job, user: req.user ? req.user : null })
    })
    .catch()
}
function jobUpdate(req, res) {
    if (req.body.description === "") {
        delete req.body.description
    }
    console.log(req.body)
    Job.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(result => res.redirect(`/jobs/${req.params.id}`))
    .catch(err => console.log(err))    
}