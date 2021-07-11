const express = require("express")
const mongoose = require("mongoose")
const Job = require("./models/job")
require("dotenv").config()

//express app
const app = express()

//connect to mongoDB and listen for requests
mongoose.connect(process.env.MONGODBSTRING, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {app.listen(3000)})
    .catch((err) => {console.log(err)})
// register view engine
app.set("view engine", "ejs")

//Static files and Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// home page get
app.get("/", (req, res) => {
    res.redirect("/jobs")
})

// login page get
app.get("/login", (req,res) => {
    res.render("login", { title: "Login" })
})
// register page get
app.get("/register", (req,res) => {
    res.render("register", { title: "Sign-Up" })
})

//about page get
app.get("/about", (req, res) => {
    res.render("about", { title: "About Us"})
})

// Jobs pages get
app.get("/jobs", (req, res) => {
    Job.find().sort({ createdAt: -1 })
    .then(result => {
        res.render("index" , { title: "All Jobs", jobs: result })
    })
    .catch(err => {
        console.log(err)
    })
})
// Handle Posting New Job
app.post("/jobs", (req, res) => {
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
app.get("/jobs/post", (req, res) => {
    res.render("newjob", { title: "Post Job"})
})

//404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404"})
})