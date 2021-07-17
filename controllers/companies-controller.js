import { Company } from "../models/company.js"
import { Job } from "../models/job.js"

export {
    newCompany as new,
    index,
    show,
    deleteCompany as delete,
    edit,
    update,
    create,
    search,
}

function newCompany (req, res) {
    res.render("companies/create", { title: "New Company", user: req.user ? req.user : null })
}
function show (req, res) {
    Company.findById(req.params.id)
    .populate("jobs")
    .exec()
    .then(company => {
        Job.find({_id: {$nin: company.jobs}})
        .then(jobs => {
            res.render("companies/show", {
                title: "Company Details",
                company: company,
                jobs: jobs,
                user: req.user ? req.user: null,
            })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}
function index (req, res) {
    Company.find({})
    .then(companies => {
        res.render("companies/index", { title: "All Companies", companies: companies, user: req.user ? req.user : null })
    })
    .catch(err => console.log(err))
}
function deleteCompany (req, res) {
    const id = req.params.id

    Company.findByIdAndDelete(id)
    .then(result => {
        res.redirect("/companies")
    })
    .catch(err => console.log(err))
}

function edit (req, res) {
    Company.findById(req.params.id)
    .then((company) =>{
        res.render("companies/edit", { title: "Update Company Info", company: company, user: req.user ? req.user: null})
    })
    .catch(err => console.log(err))
}
function update (req, res) {
    req.body.userPosted = req.user.profile
    Company.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(company => {
        res.redirect(`/companies/${company._id}`)
    })
    .catch(err => console.log(err))
}
function create (req, res) {
    req.body._id = req.params.id
    req.body.userPosted = req.user.profile
    const company = new Company(req.body)
    company.save()
    .then(result => res.redirect("/companies"))
    .catch(err => console.log(err))
}
function search(req, res) {
    console.log(req.body.searchParam)
    console.log(req.body.searchContent)
    if (req.body.searchParam === "jobs") {
        Job.find({ title: req.body.searchContent})
        .then(jobs => {
            console.log(jobs)
            res.render("jobs/search", { title: "Search Results", jobs: jobs, user: req.user ? req.user: null})
        })
    } else if (req.body.searchParam === "companies") {
        Company.find({ companyName: req.body.searchContent})
        .then(companies => {
            res.render("companies/search", { title: "Search Results", companies: companies, user: req.user ? req.user: null})
        })
        .catch(err => console.log(err))
    }
}