import {Job} from "../models/job.js"
import { Profile } from "../models/profile.js"
import { User } from "../models/user.js"
import { Company } from "../models/company.js"

export {
    index,
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

function index (req, res) {
    // Profile.find({})
    // .then(profiles => {
    //     Profile.findById(req.user.profile)
    //     .then(curProfile => {
    //         res.render("users/index", {
    //             profiles: profiles,
    //             title: "All Users",
    //             curProfile: curProfile,
    //             user: req.user ? req.user : null,
    //         })
    //     })
    // })
    // .catch(err => {
    //     console.log(err)
    //     res.render("error", {title: "Error", user: req.user ? req.user : null})
    // })
}

function show (req, res) {
    Profile.findById(req.params.id)
        .then(profile => {
            res.render("profiles/show", {
                title: "Profile Details",
                profile: profile,
                user: req.user ? req.user: null,
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
    Profile.findById(req.user.profile._id)
        .then(profile => {
            res.render("profiles/edit", {
            title: "Edit Profile",
            profile: profile,
            user: req.user ? req.user: null,
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function update (req, res) {
    Profile.findByIdAndUpdate(req.user.profile._id, req.body, {new: true})
    .then(() => {
        res.redirect(`/profiles/${req.user.profile._id}`)
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
    Profile.findById(req.user.profile._id)
    .then(profile => {
        profile.skills.push(req.body)
        profile.save()
        .then(() => {
            res.redirect(`/profiles/${req.user.profile._id}`)
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
    Profile.findById(req.user.profile._id)
    .then(profile => {
        profile.education.push(req.body)
        profile.save()
        .then(() => {
            res.redirect(`/profiles/${req.user.profile._id}`)
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
    Profile.findById(req.user.profile._id)
    .then(profile => {
        profile.experiences.push(req.body)
        profile.save()
        .then(() => {
            res.redirect(`/profiles/${req.user.profile._id}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}

function deleteSkill (req, res) {
    Profile.findById(req.user.profile._id)
    .then(profile => {
        profile.skills.remove({_id: req.params.id})
        profile.save()
        .then(() => {
            res.redirect(`/profiles/${req.user.profile._id}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}
function deleteEducation (req, res) {
    Profile.findById(req.user.profile._id)
    .then(profile => {
        profile.education.remove({_id: req.params.id})
        profile.save()
        .then(() => {
            res.redirect(`/profiles/${req.user.profile._id}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}
function deleteExperience (req, res) {
    Profile.findById(req.user.profile._id)
    .then(profile => {
        profile.experiences.remove({_id: req.params.id})
        profile.save()
        .then(() => {
            res.redirect(`/profiles/${req.user.profile._id}`)
        })
    })
    .catch(err => {
        console.log(err)
        res.render("error", {title: "Error", user: req.user ? req.user : null})
    })
}