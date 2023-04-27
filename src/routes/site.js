const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.get("/gioi-thieu", siteController.introduce);
router.get("/lien-he", siteController.contact);
router.get("/", siteController.home);

module.exports = router;