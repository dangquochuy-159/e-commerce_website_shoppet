const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const session = require('express-session');
const flash = require('connect-flash');
const Admin = require("../models/admin")
const Product = require("../models/product")
const Order = require("../models/order")
const Customer = require("../models/customer")



class AdminController {
    //[GET] /admin
    admin(req, res, next) {
        const adminId = req.session.adminId;
        Admin.findOne({ admin_ID: req.session.adminId })
            .then((admin) => {
                res.locals.session = req.session;
                res.render('admin/dashboard', {
                    layout: false,
                    admin: mongooseToObject(admin)
                });
            })
            .catch(next)
    }

    //[GET] /admin/dang-nhap
    login(req, res, next) {
        res.locals.session = req.session;
        res.render('admin/login', { layout: false })
    }

    //[GET] /admin/dang-xuat
    logout(req, res, next) {
        delete req.session.adminId
        delete req.session.adminImage
        delete req.session.adminName
        // Chuyển hướng người dùng đến trang đăng nhập
        res.redirect('/admin/dang-nhap')

    }

    //[POST] /admin/kiem-tra-dang-nhap
    loginCheck(req, res, next) {
        Admin.findOne({ user_name: req.body.user_name })
            .then((admin) => {
                admin = mongooseToObject(admin)
                let isPasswordCorrect = bcrypt.compareSync(req.body.password, admin.password)

                // if (!admin || !(password === admin.password))
                if (!admin || !isPasswordCorrect) {
                    return res.redirect('/admin/dang-nhap');
                }
                req.session.adminId = admin.admin_ID;
                req.session.adminImage = admin.image;
                req.session.adminName = admin.name;
                return res.redirect('/admin');
            })
            .catch((err) => {
                return res.redirect('/admin/dang-nhap');
            });
    }

    //[GET] /admin/dang-ky
    register(req, res, next) {
        res.locals.session = req.session;
        res.render('admin/register', { layout: false });
    }

    //[POST] /admin/kiem-tra-dang-ky
    registerCheck(req, res, next) {
        const admin = new Admin(req.body);
        admin
            .save()
            .then(() => {
                return res.redirect('/admin/dang-nhap');
            })
            .catch(next);
    }

    //[GET] /admin/danh-sach/tai-khoan
    listAdmin(req, res, next) {
        Admin.find({})
            .then((admin) => {
                res.locals.session = req.session;
                res.render('admin/listAdmin', {
                    layout: false,
                    admin: mutipleMongooseToObject(admin)
                });
            })
            .catch(next);
    }

    //[GET] /danh-sach/don-dat-hang
    listOrder(req, res, next) {
        Order.find({})
            .then((order) => {
                res.locals.session = req.session;
                res.render("admin/listOrder", {
                    layout: false,
                    order: mutipleMongooseToObject(order)
                })
            })
    }
    //[GET] /danh-sach/tai-khoan
    listCustomer(req, res, next) {
        Customer.find({})
            .then((customer) => {
                res.locals.session = req.session;
                res.render('admin/listCustomer', {
                    layout: false,
                    customer: mutipleMongooseToObject(customer),
                })
            })
    }


}

module.exports = new AdminController()