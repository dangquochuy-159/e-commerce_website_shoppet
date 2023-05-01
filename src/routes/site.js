const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.get("/tai-khoan", siteController.account);
router.get("/lien-he", siteController.contact);
router.get("/gio-hang", siteController.cart);
router.get("/gioi-thieu", siteController.introduce);
router.get("/", siteController.home);

module.exports = router;