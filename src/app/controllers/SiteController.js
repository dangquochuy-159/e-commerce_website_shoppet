const User = require("../models/admin");

const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");

const Category = require("../models/category")
const Product = require("../models/product")
const Customer = require("../models/customer")
const Order = require("../models/order")


class SiteController {
    //[GET] /
    home(req, res, next) {
        Promise.all([
            Category.find({}),
            Product.find({}),
        ])
            .then(([category, product]) => {
                res.locals.session = req.session;
                res.render("pages/home", {
                    category: mutipleMongooseToObject(category),
                    product: mutipleMongooseToObject(product),
                    // session: req.session
                });
            })
    }
    //[GET] /gioi-thieu
    introduce(req, res, next) {
        res.locals.session = req.session;
        res.render("pages/introduce")
    }


    //[GET] /lien-he
    contact(req, res, next) {
        res.locals.session = req.session;
        res.render("pages/contact")
    }


    login(req, res, next) {
        res.render('admin/login')
    }

    //[GET] /chi-tiet/:slug
    detailProduct(req, res, next) {
        res.locals.session = req.session;
        Product.findOne({ slug: req.params.slug })
            .then((product) => {
                Product.find({ categoryID: product.categoryID })
                    .then((productList) => {
                        res.render('pages/detailProduct', {
                            product: mongooseToObject(product),
                            productList: mutipleMongooseToObject(productList)
                        })
                    })
            })
    }

    //[GET] /chi-tiet/don-dat-hang/:id  
    detailOrder(req, res, next) {
        Promise.all([
            Order.findOne({ order_ID: req.params.id }),
            Customer.find({}),
        ])
            .then(([order, customer]) => {
                res.render("admin/detailOrder", {
                    layout: false,
                    order: mongooseToObject(order),
                    customer: mutipleMongooseToObject(customer)
                })
            })
    }
}
module.exports = new SiteController()