

function indexJobGet(req,res) {
    Job.find().sort({ createdAt: -1 })
    .then(result => {
        res.render("index" , { title: "All Jobs", jobs: result })
    })
    .catch(err => {
        console.log(err)
    })
}

function indexJobPost(req,res) {
    const job = new Job(req.body)
    job.save()
    .then((result) => {
        res.redirect("/jobs")
    })
    .catch((err) => {
        console.log(err)
    })
}

function jobDetailsGet(req,res) {
    const id = req.params.id
    Job.findById(id)
    .then(result => {
        res.render("job-details", { title: "Job Details", job: result})
    })
    .catch(err=> {
        console.log(err)
    })
}

function jobDetailsDelete(req,res) {
    const id = req.params.id

    Job.findByIdAndDelete(id)
    .then(result => {
        res.redirect("/jobs")
    })
    .catch(err => console.log(err))
}