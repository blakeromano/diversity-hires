export {
    index,
    about,
}

function index(req, res){res.render("index", {title: "Home", user: req.user ? req.user: null})}

function about(req, res){res.render('about', {title: "About Us", user: req.user ? req.user: null})}
