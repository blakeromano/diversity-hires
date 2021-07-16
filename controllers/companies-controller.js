import { Company } from "../models/company.js"

export {
    newCompany as new,
    index,
    show,
    deleteCompany as delete,
    edit,
    update,
    create,
}

function newCompany (req, res) {
    res.render("companies/create", { title: "New Company", user: req.user ? req.user : null })
}
function show (req, res) {
    Company.findById(req.params.id)
    .then(company => {
        res.render("companies/show", { title: "Company Details", company: company, user: req.user ? req.user : null})
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

}

function edit (req, res) {

}
function update (req, res) {

}
function create (req, res) {
    const company = new Company(req.body)
    company.save()
    .then(result => res.redirect("/companies"))
    .catch(err => console.log(err))
}