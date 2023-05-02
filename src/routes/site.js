const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");
const customerController = require("../app/controllers/CustomerController");


// router.get("/dang-xuat", siteController.logout);
router.get("/dang-nhap", customerController.login);
// router.post("/kiem-tra-dang-nhap", siteController.loginCheck);
router.get("/dang-ky", customerController.register);
// router.post("/kiem-tra-dang-ky", siteController.registerCheck);
router.get("/tai-khoan", siteController.account);

router.get("/lien-he", siteController.contact);

router.get("/gio-hang", siteController.cart);
// router.post("/them/gio-hang", siteController.cart);
// router.delete("/xóa/:id/gio-hang", siteController.cart);


router.get("/gioi-thieu", siteController.introduce);
router.get("/", siteController.home);

module.exports = router;