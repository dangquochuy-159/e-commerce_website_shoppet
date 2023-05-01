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
router.get("/danh-sach/tai-khoan", adminController.listAdmin);

// PRODUCT CONTROLLER
router.get("/danh-sach/san-pham", productController.listProduct);
router.get("/them/san-pham", productController.addProduct);
router.post("/kiem-tra-them/san-pham", productController.checkAddProduct);
router.get("/:id/sua/san-pham", productController.editProduct);
router.put("/danh-sach/san-pham/:id", productController.updateProduct);
router.delete("/danh-sach/san-pham/:id", productController.deleteProduct);
router.post('/danh-sach/san-pham/delete-checked', productController.deleteCheckedProduct);


// CATEGORY CONTROLLER
router.get("/danh-sach/loai-san-pham", categoryController.listCategory);
router.get("/them/loai-san-pham", categoryController.addCategory);
router.post("/kiem-tra-them/loai-san-pham", categoryController.checkAddCategory);

router.get("/:id/sua/loai-san-pham", categoryController.editCategory);
router.put("/danh-sach/loai-san-pham/:id", categoryController.updateCategory);
// router.delete("/danh-sach/san-pham/:id", productController.deleteProduct);
// router.post('/danh-sach/san-pham/delete-checked', productController.deleteCheckedProduct);


router.get("/", adminController.admin);

module.exports = router;