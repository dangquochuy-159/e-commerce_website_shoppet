const express = require("express");
const router = express.Router();
const requireLogin = require('../app/middlewares/requireLogin');

const adminController = require("../app/controllers/AdminController");
const categoryController = require("../app/controllers/CategoryController");
const productController = require("../app/controllers/ProductController");


// ADMIN CONTROLLER
router.get("/dang-ky", adminController.register);
router.get("/dang-nhap", adminController.login);
router.get("/dang-xuat", adminController.logout);
router.post("/kiem-tra-dang-ky", adminController.registerCheck);
router.post("/kiem-tra-dang-nhap", adminController.loginCheck);
router.get("/danh-sach/tai-khoan", requireLogin, adminController.listAdmin);

// PRODUCT CONTROLLER
router.get("/danh-sach/san-pham", requireLogin, productController.listProduct);
router.get("/them/san-pham", requireLogin, productController.addProduct);
router.post("/kiem-tra-them/san-pham", requireLogin, productController.checkAddProduct);
router.get("/:id/sua/san-pham", requireLogin, productController.editProduct);
router.put("/danh-sach/san-pham/:id", requireLogin, productController.updateProduct);
router.delete("/danh-sach/san-pham/:id", requireLogin, productController.deleteProduct);
router.post('/danh-sach/san-pham/delete-checked', requireLogin, productController.deleteCheckedProduct);


// CATEGORY CONTROLLER
router.get("/danh-sach/loai-san-pham", requireLogin, categoryController.listCategory);
router.get("/them/loai-san-pham", requireLogin, categoryController.addCategory);
router.post("/kiem-tra-them/loai-san-pham", requireLogin, categoryController.checkAddCategory);

router.get("/:id/sua/loai-san-pham", requireLogin, categoryController.editCategory);
router.put("/danh-sach/loai-san-pham/:id", requireLogin, categoryController.updateCategory);
router.delete("/danh-sach/loai-san-pham/:id", requireLogin, categoryController.deleteCategory);
router.post('/danh-sach/loai-san-pham/delete-checked', requireLogin, categoryController.deleteCheckedCategory);


router.get("/", requireLogin, adminController.admin);

module.exports = router;