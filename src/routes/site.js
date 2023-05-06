const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const customerController = require("../app/controllers/CustomerController");
const cartController = require("../app/controllers/CartController");

//customerController
router.get("/dang-xuat", customerController.logout);
router.get("/dang-nhap", customerController.login);
router.post("/kiem-tra-dang-nhap", customerController.loginCheck);
router.get("/dang-ky", customerController.register);
router.post("/kiem-tra-dang-ky", customerController.registerCheck);
router.get("/tai-khoan", customerController.account);

//cartController
router.get("/gio-hang", cartController.cart);
router.post("/them/gio-hang/:id", cartController.addCart);
router.put("/sua/gio-hang/:id", cartController.updateCart);
router.delete("/xoa/gio-hang/:id", cartController.deleteCart);

router.get("/thanh-toan/gio-hang", cartController.payCart)
router.post("/xac-nhan/thanh-toan/gio-hang", cartController.confirmPayCart)

router.get("/thanh-toan/san-pham/:id", cartController.payProduct)
router.post("/xac-nhan/thanh-toan/san-pham", cartController.confirmPayProduct)

router.get("/thanh-toan/thanh-cong", cartController.successPay)


router.get("/chi-tiet/don-dat-hang/:id", siteController.detailOrder);
router.get("/chi-tiet/:slug", siteController.detailProduct);
router.get("/lien-he", siteController.contact);
router.get("/gioi-thieu", siteController.introduce);
router.get("/", siteController.home);

module.exports = router;