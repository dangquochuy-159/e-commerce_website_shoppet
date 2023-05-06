const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const session = require('express-session');
const flash = require('connect-flash');
const Admin = require("../models/admin")
const Product = require("../models/product")
const Customer = require("../models/customer")
const Order = require("../models/order")

class CustomerController {
    //[GET] /tai-khoan
    account(req, res, next) {
        res.locals.session = req.session;
        Promise.all([
            Order.find({ id_customer: req.session.customerID }),
            Customer.findOne({ customer_ID: req.session.customerID })
        ])
            .then(([order, customer]) => {
                res.render("pages/account", {
                    order: mutipleMongooseToObject(order),
                    customer: mongooseToObject(customer)
                })


            })
    }

    //[GET ] /dang-nhap
    login(req, res, next) {
        res.render('customer/login', { layout: false });
    }

    //[POST] /kiem-tra-dang-nhap
    loginCheck(req, res, next) {
        Customer.findOne({ user_name: req.body.user_name })
            .then((customer) => {
                customer = mongooseToObject(customer)
                if (!customer || !bcrypt.compareSync(req.body.password, customer.password)) {
                    return res.redirect('/dang-nhap');
                }
                req.session.customerID = customer.customer_ID;
                req.session.customerName = customer.name;
                req.session.customerImage = customer.image;
                console.log(req.session);
                return res.redirect('/');
            })
    }

    //[GET ] /dang-ky
    register(req, res, next) {
        res.render('customer/register', { layout: false });
    }

    //[POTS] /kiem-tra-dang-ky
    registerCheck(req, res, next) {
        const customer = new Customer(req.body)
        customer
            .save()
            .then(() => {
                return res.redirect('/dang-nhap')
            })
            .catch(next)
    }

    //[GET] /dang-xuat
    logout(req, res, next) {
        delete req.session.customerID
        // Chuyển hướng người dùng đến trang đăng nhập
        console.log("req.session: ", req.session);
        res.redirect('back')
    }
}
module.exports = new CustomerController()