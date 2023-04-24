const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controllers/admincontroller");
const auth = require("../middleware/auth");
const { admin } = require("../models/connection");
const multer = require("../multer/multer")



/* GET home page. */
router.get("/dashboard", auth.adminAuth, adminController.getDashboard);

// get login page
router.get("/",auth.adminAuth, adminController.getLogin);

// post login page
router.post("/", adminController.postLogin);

// get user list
router.get('/userList',auth.adminAuth,adminController.getUserList)

// user status
router.put('/change_user_status',adminController.changeUserStatus)

// get add-product
router.get("/addproduct",auth.adminAuth, adminController.getAddProduct);

// post add-product
router.post('/addproduct', multer.uploads , adminController.postAddProduct)

// get edit product
router.get('/editproduct/:id',adminController.getEditProduct)

// post edit product
router.post('/editproduct/:id',multer.editeduploads , adminController.postEditProduct)

// delete product
router.delete('/deleteproduct/:id',auth.adminAuth, adminController.deleteProduct)



// get product list
router.get('/productlist',auth.adminAuth , adminController.getProductList)



// get add-category
router.get("/addcategory",auth.adminAuth, adminController.getAddCategory);

// post add-category
 router.post('/addcategory',adminController.postAddCategory)

//  post edit-category
router.post('/editcategory' , adminController.postEditCategory)

// post delete category
router.delete('/api/delete-category/:id',adminController.deleteCategory)

router.get('/logout', adminController.getLogout)



module.exports = router;
