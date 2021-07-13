export {
    indexGet,
    aboutGet,
}

function indexGet(req, res) {
    res.redirect("/jobs")
}

function aboutGet(req,res) {
    res.render("about", { title: "About Us"})
}