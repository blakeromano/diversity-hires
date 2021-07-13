import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import * as indexController from "./controllers/indexController.js"
import {userRoutes} from "./routes/userRoutes.js"
import {jobRoutes} from "./routes/jobRoutes.js"
import passport from "passport"
import session from "express-session"
const dotenvConfig = dotenv.config()

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

app.use(session({
    secret: "keyboard boop",
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

// home page get
app.get("/", (req, res) => {indexController.indexGet(req,res)})

//about page get
app.get("/about", (req, res) => {indexController.aboutGet(req, res)})

// job routes
app.use("/jobs", jobRoutes)

// user routes
app.use("/user", userRoutes)

//404 page
app.use((req, res) => {
    res.status(404).render("404", { title: "404"})
})