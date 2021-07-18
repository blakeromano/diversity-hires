import {Job} from "../models/job.js"
import { Profile } from "../models/profile.js"
import { User } from "../models/user.js"
import { Company } from "../models/company.js"

export {
    show,
    edit,
    update,
    newSkill,
    newExperience,
    newEducation,
    deleteEducation,
    deleteSkill,
    deleteExperience,
}

function show (req, res) {
    User.findById(req.params.id)
    .then(user => {
        Profile.findById(user.profile)
        .populate("jobsPosted")
        .exec()
        .then(profile => {
            Profile.find({_id: {$nin: profile.jobsPosted}})
            .then(jobsPosted => {
                res.render("users/show", {
                    title: "User Details",
                    profile: profile,
                    userProfile: user,
                    jobsPosted: jobsPosted,
                    user: req.user ? req.user: null,
                })
            })
            .catch(err => {
                console.log(err)
                res.render("error", {title: "Error", user: req.user ? req.user : null})
            })
        })
        .catch(err => {
            console.log(err)
            res.render("error", {title: "Error", user: req.user ? req.user : null})
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function edit (req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }    
    User.findById(req.user)
    .then(user => {
        Profile.findById(user.profile)
        .then(profile => {
            res.render("users/edit", {
                title: "Edit Profile",
                profile: profile,
                user: req.user ? req.user: null,
            })
        })
        .catch(err => {
            console.log(err)
            res.render("error", {title: "Error", user: req.user ? req.user : null})
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function update (req, res) {
    User.findById(req.user)
    .then(user => {
        Profile.findByIdAndUpdate(user.profile, req.body, {new: true})
        .then(profile => {
            res.redirect(`/users/${user._id}`)
        })
        .catch(err => {
            console.log(err)
            res.render("error", {title: "Error", user: req.user ? req.user : null})
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function newSkill (req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Profile.findById(req.user.profile)
    .then(profile => {
        profile.skills.push(req.body)
        profile.save()
        .then(() => {
            res.redirect(`/users/${req.user._id}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function newEducation(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Profile.findById(req.user.profile)
    .then(profile => {
        profile.education.push(req.body)
        profile.save()
        .then(() => {
            res.redirect(`/users/${req.user._id}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}
function newExperience(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key]
    }
    Profile.findById(req.user.profile)
    .then(profile => {
        profile.experiences.push(req.body)
        profile.save()
        .then(() => {
            res.redirect(`/users/${req.user._id}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function deleteSkill (req, res) {
    Profile.findById(req.user.profile)
    .then(profile => {
        console.log(req.params.id)
        const skill = profile.skills.filter((skill) => {
            return req.params.id === skill._id
        })
        console.log(skill)
        const skillIndex = profile.skills.indexOf(skill)
        console.log(skillIndex)
        profile.skills.splice(skillIndex, 1)
        res.redirect(`/users/${req.user._id}`)
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}
function deleteEducation (req, res) {
    
}
function deleteExperience (req, res) {
    
}