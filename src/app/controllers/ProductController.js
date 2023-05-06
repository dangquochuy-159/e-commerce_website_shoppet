const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const session = require('express-session');
const flash = require('connect-flash');
const Category = require("../models/category")
const Product = require('../models/product');

class ProductController {

    // [GET] /admin/danh-sach/san-pham
    listProduct(req, res, next) {
        Promise.all([
            Category.find({}),
            Product.find({}),
        ])
            .then(([category, product]) => {
                res.locals.session = req.session;
                res.render('admin/listProduct', {
                    layout: false,
                    category: mutipleMongooseToObject(category),
                    product: mutipleMongooseToObject(product),
                });
            })
            .catch(next)
    }

    // [GET] /admin/them/san-pham
    addProduct(req, res, next) {
        Category.find({})
            .then((category) => {
                res.locals.session = req.session;
                res.render('admin/addProduct', {
                    layout: false,
                    category: mutipleMongooseToObject(category),
                });
            })
            .catch(next)
    }

    // [POST] /admin/kiem-tra-them/san-pham
    checkAddProduct(req, res, next) {
        const product = new Product(req.body);
        product
            .save()
            .then(() => {
                res.redirect("/admin/danh-sach/san-pham");
            })
            .catch(next);
    }
    //[GET] /admin/:id/sua/san-pham
    editProduct(req, res, next) {
        Promise.all([
            Product.findOne({ product_ID: req.params.id }),
            Category.find({})
        ])
            .then(([product, category]) => {
                res.render('admin/editProduct', {
                    layout: false,
                    product: mongooseToObject(product),
                    category: mutipleMongooseToObject(category),
                });
            })
            .catch(next)
    }
    //[PUT] /admin/sua/san-pham/:id
    updateProduct(req, res, next) {
        Product.updateOne({ product_ID: req.params.id }, req.body)
            .then(() => res.redirect("/admin/danh-sach/san-pham"))
            .catch(next);
    }

    //[DELTE] /admin/xoa/san-pham/:id
    deleteProduct(req, res, next) {
        Product.deleteOne({ product_ID: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    //[POST] /admin/danh-sach/san-pham/delete-checked
    deleteCheckedProduct(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                // { $in: req.body.productIds }  --> cú pháp đọc list productIds
                Product.deleteMany({ product_ID: { $in: req.body.productIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' })
        }
    }
}

module.exports = new ProductController()