const User = require("../models/admin");

const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");

class SiteController {
    //[GET] /
    home(req, res, next) {
        res.render("pages/home");
    }
    //[GET] /gioi-thieu
    introduce(req, res, next) {
        res.render("pages/introduce")
    }
    //[GET] /gio-hang
    cart(req, res, next) {
        res.render("pages/cart")
    }

    //[GET] /lien-he
    contact(req, res, next) {
        res.render("pages/contact")
    }
    //[GET] /tai-khoan
    account(req, res, next) {
        res.render("pages/account")
    }

    login(req, res, next) {
        res.render('admin/login')
    }
}
module.exports = new SiteController()