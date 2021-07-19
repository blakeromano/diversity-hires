import {Job} from "../models/job.js"
import { Profile } from "../models/profile.js"
import { User } from "../models/user.js"
import { Company } from "../models/company.js"

export {
    index,
    create,
    deleteJob as delete,
    show,
    newJob as new,
    edit,
    update,
}

function index(req,res) {
    Job.find().sort({ createdAt: -1 })
    .then(result => {
        res.render("jobs/index" , { title: "All Jobs", jobs: result, user: req.user ? req.user : null })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function create(req,res) {
    req.body.userPosted = req.user.profile
    if (req.body.description === "") {
        delete req.body.description
    }
    if (req.body.company === "") {
        delete req.body.company
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
                    res.redirect("/jobs")
                })
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function show(req,res) {
    const id = req.params.id
    Job.findById(id)
    .then(result => {
        res.render("jobs/show", { title: "Job Details", job: result, user: req.user ? req.user : null })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error",user: req.user ? req.user : null})
    })
}

function deleteJob(req,res) {
    const id = req.params.id

    Job.findByIdAndDelete(id)
    .then(result => {
        res.redirect("/jobs")
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function newJob(req,res) {
    Company.find({})
    .then(companies => {
        Profile.findById(req.user.profile)
        .then(profile => {
            res.render("jobs/create", {
                 title: "Post Job", 
                 companies: companies, 
                 user: req.user ? req.user : null,
                 profile: profile
            })
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function edit(req, res) {
    Job.findById(req.params.id)
    .then(job => {
        res.render("jobs/edit", { title: "Edit Job", job: job, user: req.user ? req.user : null })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}
function update(req, res) {
    if (req.body.description === "") {
        delete req.body.description
    }
    Job.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(result => res.redirect(`/jobs/${req.params.id}`))
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })   
}