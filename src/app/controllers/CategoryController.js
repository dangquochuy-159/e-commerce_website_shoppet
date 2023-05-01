const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const session = require('express-session');
const flash = require('connect-flash');
const Category = require("../models/category")

class CategoryController {
    // [GET] /admin/danh-sach/loai-san-pham
    listCategory(req, res, next) {
        Category.find({})
            .then((category) => {
                res.render('admin/listCategory', {
                    layout: false,
                    category: mutipleMongooseToObject(category)
                });
            })
            .catch(next);
    }

    // [GET] /admin/them/loai-san-pham
    addCategory(req, res, next) {
        res.render('admin/addCategory', { layout: false });
    }

    // [POST] /admin/kiem-tra-them/loai-san-pham
    checkAddCategory(req, res, next) {
        const category = new Category(req.body);
        category
            .save()
            .then(() => {
                res.redirect("/admin/danh-sach/loai-san-pham");
            })
            .catch(next);
    }

    //[GET] /admin/:id/sua/loai-san-pham
    editCategory(req, res, next) {
        Category.findOne({ category_ID: req.params.id })
            .then((category) =>
                res.render("admin/editCategory", {
                    layout: false,
                    category: mongooseToObject(category),
                })
            )
            .catch(next);
    }

    //[PUT] /admin/danh-sach/loai-san-pham/:id
    updateCategory(req, res, next) {
        Category.updateOne({ category_ID: req.params.id }, req.body)
            .then(() => res.redirect("/admin/danh-sach/loai-san-pham"))
            .catch(next);
    }
}

module.exports = new CategoryController()