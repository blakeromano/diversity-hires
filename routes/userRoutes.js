
import express from "express"

const userRoutes = express.Router()

// login page get
userRoutes.get("/login", (req,res) => {
    res.render("login", { title: "Login" })
})
// register page get
userRoutes.get("/register", (req,res) => {
    res.render("register", { title: "Sign-Up" })
})



export {userRoutes}