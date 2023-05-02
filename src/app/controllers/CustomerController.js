const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const session = require('express-session');
const flash = require('connect-flash');
const Admin = require("../models/admin")
const Product = require("../models/product")

class CustomerController {


    //[GET ] /dang-nhap
    login(req, res, next) {
        res.render('customer/login')
    }
    //[GET ] /dang-ky
    register(req, res, next) {
        res.render('customer/register')
    }
}
module.exports = new CustomerController()