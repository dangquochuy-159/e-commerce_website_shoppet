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
                res.render('admin/dashboard', {
                    layout: false,
                    admin: mongooseToObject(admin)
                });
            })
            .catch(next)
    }

    //[GET] /admin/dang-nhap
    login(req, res, next) {
        res.render('admin/login', { layout: false })
    }

    //[GET] /admin/dang-xuat
    logout(req, res, next) {
        delete req.session.adminId
        // Chuyển hướng người dùng đến trang đăng nhập
        console.log("req.session: ", req.session);
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
                console.log("req.session: ", req.session);
                console.log("typeof req.session: ", typeof req.session);
                return res.redirect('/admin');
            })
            .catch((err) => {
                return res.redirect('/admin/dang-nhap');
            });
    }

    //[GET] /admin/dang-ky
    register(req, res, next) {
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
                res.render('admin/listAdmin', {
                    layout: false,
                    admin: mutipleMongooseToObject(admin)
                });
            })
            .catch(next);
    }

    //[GET] /admin/danh-sach/san-pham
    listProduct(req, res, next) {
        Product.find({})
            .then((product) => {
                res.render('admin/listProduct', {
                    layout: false,
                    product: mutipleMongooseToObject(product)
                });
            })
            .catch(next);
    }

    //[GET] /danh-sach/don-dat-hang
    listOrder(req, res, next) {
        Order.find({})
            .then((order) => {

                res.render("admin/listOrder", {
                    layout: false,
                    order: mutipleMongooseToObject(order)
                })
            })
    }


}

module.exports = new AdminController()