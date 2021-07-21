import { Profile } from "../models/profile.js"
import { Company } from "../models/company.js"
import { Job } from "../models/job.js"

export {
    index,
    about,
}

function index(req, res){
    Profile.find({})
    .sort({_id: -1})
    .limit(5)
    .then(profiles => {
        Company.find({})
        .limit(5)
        .sort({_id: -1})
        .then(companies => {
            Job.find({})
            .limit(6)
            .sort({_id: -1})
            .then(jobs => {
                res.render("index", {
                    title: "Home", 
                    user: req.user ? req.user: null,
                    profiles: profiles,
                    companies: companies,
                    jobs: jobs,
                })

            })
        })
    })
}

function about(req, res){res.render('about', {title: "About Us", user: req.user ? req.user: null})}
