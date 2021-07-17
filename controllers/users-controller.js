import {Job} from "../models/job.js"
import { Profile } from "../models/profile.js"
import { User } from "../models/user.js"
import { Company } from "../models/company.js"

export {
    show,
}

function show (req, res) {
    User.findById(req.user)
    .then(user => {
        Profile.findById(user.profile)
        .then(profile => {
            console.log(profile)
            res.render("users/show", {
                title: "Profile Info",
                profile: profile,
                user: req.user ? req.user : null,
            })
        })
    })
}
