const express = require("express");
const router = express.Router();
const requireLogin = require('../app/middlewares/requireLogin');

const adminController = require("../app/controllers/AdminController");
const categoryController = require("../app/controllers/CategoryController");
const productController = require("../app/controllers/ProductController");
const orderController = require("../app/controllers/OrderController");


// ADMIN CONTROLLER
router.get("/dang-ky", adminController.register);
router.get("/dang-nhap", adminController.login);
router.get("/dang-xuat", adminController.logout);
router.post("/kiem-tra-dang-ky", adminController.registerCheck);
router.post("/kiem-tra-dang-nhap", adminController.loginCheck);
router.get("/danh-sach/tai-khoan", requireLogin.admin, adminController.listAdmin);

// PRODUCT CONTROLLER
router.get("/danh-sach/san-pham", requireLogin.admin, productController.listProduct);
router.get("/them/san-pham", requireLogin.admin, productController.addProduct);
router.post("/kiem-tra-them/san-pham", requireLogin.admin, productController.checkAddProduct);
router.get("/:id/sua/san-pham", requireLogin.admin, productController.editProduct);
router.put("/sua/san-pham/:id", requireLogin.admin, productController.updateProduct);
router.delete("/xoa/san-pham/:id", requireLogin.admin, productController.deleteProduct);
router.post('/danh-sach/san-pham/delete-checked', requireLogin.admin, productController.deleteCheckedProduct);


// CATEGORY CONTROLLER
router.get("/danh-sach/loai-san-pham", requireLogin.admin, categoryController.listCategory);
router.get("/them/loai-san-pham", requireLogin.admin, categoryController.addCategory);
router.post("/kiem-tra-them/loai-san-pham", requireLogin.admin, categoryController.checkAddCategory);

router.get("/:id/sua/loai-san-pham", requireLogin.admin, categoryController.editCategory);
router.put("/sua/loai-san-pham/:id", requireLogin.admin, categoryController.updateCategory);
router.delete("/xoa/loai-san-pham/:id", requireLogin.admin, categoryController.deleteCategory);
router.post('/danh-sach/loai-san-pham/delete-checked', requireLogin.admin, categoryController.deleteCheckedCategory);

//ORDER CONTROLLER  
router.get("/danh-sach/don-dat-hang", requireLogin.admin, adminController.listOrder);

//CUsTOMER
router.get("/danh-sach/khach-hang", requireLogin.admin, adminController.listCustomer);



router.get("/", requireLogin.admin, adminController.admin);

module.exports = router;