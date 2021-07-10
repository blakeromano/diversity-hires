const express = require("express")
require("dotenv").config()

//express app
const app = express()

// register view engine
app.set("view engine", "ejs")

//set the public folder
app.use(express.static('public'));

// listen for requests
app.listen(3000)


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