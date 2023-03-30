const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controllers/admincontroller')

/* GET home page. */
router.get('/dashboard',adminController.getDashboard)

// get login page
router.get('/',adminController.getLogin)

// post login page
router.post('/',adminController.postLogin)


// get add-product
router.get('/addproduct',adminController.getAddProduct)

router.get('/addcategory',adminController.getAddCategory)


module.exports = router;
