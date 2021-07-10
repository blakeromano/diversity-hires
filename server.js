const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

//express app
const app = express()

//connect to mongoDB and listen for requests
mongoose.connect(process.env.MONGODBSTRING, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {app.listen(3000)})
    .catch((err) => {console.log(err)})
// register view engine
app.set("view engine", "ejs")

//set the public folder
app.use(express.static('public'));

// home page get
app.get("/", (req, res) => {
    res.render("index" , { title: "home" })
})

//new job posting get
app.get("/jobs/post", (req, res) => {
    res.render("newjob", { title: "Post Job"})
})

//about page get
app.get("/about", (req, res) => {
    res.render("about", { title: "About Us"})
})

//404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404"})
})