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
                res.locals.session = req.session;
                res.render('admin/listCategory', {
                    layout: false,
                    category: mutipleMongooseToObject(category)
                });
            })
            .catch(next);
    }

    // [GET] /admin/them/loai-san-pham
    addCategory(req, res, next) {
        res.locals.session = req.session;
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
            .then((category) => {
                res.locals.session = req.session;
                res.render("admin/editCategory", {
                    layout: false,
                    category: mongooseToObject(category),
                })
            }
            )
            .catch(next);
    }

    //[PUT] /admin/sua/loai-san-pham/:id
    updateCategory(req, res, next) {
        Category.updateOne({ category_ID: req.params.id }, req.body)
            .then(() => res.redirect("/admin/danh-sach/loai-san-pham"))
            .catch(next);
    }
    //[DELETE] /admin/xoa/loai-san-pham/:id
    deleteCategory(req, res, next) {
        Category.deleteOne({ category_ID: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    //[POST] /admin/danh-sach/loai-san-pham/delete-checked
    deleteCheckedCategory(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                // { $in: req.body.productIds }  --> cú pháp đọc list productIds
                Category.deleteMany({ category_ID: { $in: req.body.categoryIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action invalid' })
        }
    }
}

module.exports = new CategoryController()