class SiteController {
    //[GET] /
    home(req, res, next) {
        res.render("home");
    }

    //[GET] /gioi-thieu
    introduce(req, res, next) {
        res.render("introduce")
    }

    //[GET] /lien-he
    contact(req, res, next) {
        res.render("contact")
    }
}
module.exports = new SiteController()