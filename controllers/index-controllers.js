export {
    index,
    about,
}

function index(req, res){res.redirect("/jobs")}

function about(req, res){res.render('about', {title: "About Us", user: req.user ? req.user: null})}
