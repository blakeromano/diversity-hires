import * as passportSetup from "../passport-setup.js"
import express from "express"
import passport from "passport"
const userRoutes = express.Router()

// login page get
userRoutes.get("/login", (req,res) => {
    res.render("login", { title: "Login" })
})
// register page get
// userRoutes.get("/register", (req,res) => {
//     res.render("register", { title: "Sign-Up" })
// })


export {userRoutes}