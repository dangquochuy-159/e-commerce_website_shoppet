const { mutipleMongooseToObject } = require("../../util/mongoose");
const { mongooseToObject } = require("../../util/mongoose");
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require("method-override");
const Product = require("../models/product")
const Customer = require("../models/customer")
const Cart = require("../models/Cart")
const Order = require("../models/order")

class CartController {

    //[GET] /gio-hang
    cart(req, res, next) {
        Cart.find({})
            .then((cart) => {
                res.locals.session = req.session;
                res.render("pages/carts/cart", {
                    cart: mutipleMongooseToObject(cart)
                })
            })
    }

    //[DELETE] /xóa/gio-hang/:id
    deleteCart(req, res, next) {
        Cart.deleteOne({ cart_ID: req.params.id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    //[PUT] /sua/gio-hang/:id
    updateCart(req, res, next) {
        Cart.findByIdAndUpdate(req.params.id, {
            $set: {
                quantity: quantity + 1
            }
        })
            .then(() => res.redirect("/"))
            .catch(next);
    }

    //[POST] /them/gio-hang/:id
    addCart(req, res, next) {
        let productID = req.params.id
        let priceProduct
        Promise.all([
            Product.findOne({ product_ID: req.params.id }),
            Cart.findOne({ id_product: req.params.id })
        ])
            .then(([product, cart]) => {
                if (product.salePrice != null) {
                    priceProduct = product.salePrice
                } else {
                    priceProduct = product.price
                }
                if (cart) {
                    if (cart.id_customer === req.session.customerID && cart.id_product === product.product_ID) {
                        let sessionCustomer = req.session.customerID
                        let productId = product.product_ID
                        Cart.updateOne({ id_customer: sessionCustomer, id_product: productId }, {
                            $inc: { quantity: 1 }
                        })
                            .then(() => res.redirect("back"))
                            .catch(next);
                    } else {
                        const cart = new Cart({
                            id_product: product.product_ID,
                            name_product: product.name,
                            image_product: product.image,
                            quantity: 1,
                            price_product: priceProduct,
                            id_customer: req.session.customerID,
                        })
                        cart
                            .save()
                            .then(() => {
                                res.redirect("back");
                            })
                            .catch(next);
                    }
                } else {

                    const cart = new Cart({
                        id_product: product.product_ID,
                        name_product: product.name,
                        image_product: product.image,
                        quantity: 1,
                        price_product: priceProduct,
                        id_customer: req.session.customerID,
                    })
                    cart
                        .save()
                        .then(() => {
                            res.redirect("back");
                        })
                        .catch(next);
                }
            })
            .catch(next);
    }
    //[GET] /thanh-toan/gio-hang
    payCart(req, res, next) {
        Cart.find({ cart_ID: { $in: req.query.productIds } })
            .then((cart) => {
                res.locals.session = req.session;
                res.render("pages/carts/cart_pay", {
                    cart: mutipleMongooseToObject(cart)
                })
            })
    }

    //[POST] /xac-nhan/thanh-toan/gio-hang
    confirmPayCart(req, res, next) {
        Promise.all
            ([
                Cart.find({ cart_ID: req.body.cart_ID }),
                Product.find({ product_ID: req.body.id_product })
            ])
            .then(([cart, product]) => {
                let idCustomer
                let array = []
                cart.forEach((itemCart) => {
                    idCustomer = itemCart.id_customer
                    product.forEach((itemProduct) => {
                        if (itemCart.id_product === itemProduct.product_ID) {
                            const obj = {
                                quantity: itemCart.quantity,
                                product: itemProduct,
                            }
                            array.push(obj)
                        }
                    })
                })
                const order = new Order({
                    id_customer: idCustomer,
                    name_customer: req.body.name_customer,
                    address: req.body.address,
                    phone: req.body.phone,
                    total_order: req.body.total_order,
                    details: array
                })
                order
                    .save()
                    .then(() => {
                        Cart.deleteMany({ cart_ID: { $in: cart.cart_ID } })
                            .then(() => res.redirect("/thanh-toan/thanh-cong"))
                            .catch(next);
                    })
                    .catch(next);
            })
    }

    // [GET] /thanh-toan/san-pham-:id
    payProduct(req, res, next) {
        Product.findOne({ product_ID: req.params.id })
            .then((product) => {
                res.locals.session = req.session;
                res.render("pages/carts/cart_pay", {
                    product: mongooseToObject(product)
                })
            })
    }

    //[POST] /xac-nhan/thanh-toan/san-pham
    confirmPayProduct(req, res, next) {
        Product.findOne({ product_ID: req.body.id_product })
            .then((product) => {
                let array = []
                const obj = {
                    quantity: 1,
                    product: product,
                }
                array.push(obj)
                const order = new Order({
                    id_customer: req.session.customerID,
                    name_customer: req.body.name_customer,
                    address: req.body.address,
                    phone: req.body.phone,
                    total_order: req.body.total_order,
                    details: array
                })
                order
                    .save()
                    .then(() => {
                        res.redirect("/thanh-toan/thanh-cong")
                    })
            })
            .catch(next)
    }


    //[GET] /thanh-toan/thanh-cong
    successPay(req, res, next) {
        res.locals.session = req.session;
        res.render("pages/carts/successPay")
    }
}
module.exports = new CartController()



