var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/user-controller/registerHelper");
const cartController = require("../controllers/cart-controller/cartcontroller");
const ordercontroller = require("../controllers/cart-controller/ordercontroller");
const auth = require("../middleware/auth")

router.get("/", userControllers.getHomepage);

// get login page
router.get("/login", userControllers.getLogin);

// post signup page
router.post("/login", userControllers.postLogin);

// get signup page
router.get("/signup", userControllers.getSignup);

// post signup page
router.post("/signup", userControllers.postSignup);

// change product quantity
router.put('/change-product-quantity',cartController.updateQuantity)

// get shop page
router.get('/shop',userControllers.getShop)

// get cart
router.get('/cart-list',auth.userAuth,cartController.getCart)

// add to cart
router.get('/add-to-cart/:id',cartController.addToCart)

// delete product in cart
router.delete('/delete-product-cart',auth.userAuth,cartController.deleteProduct)

// get user ptofile page
router.get('/get-profile',auth.userAuth,ordercontroller.getAddress)

// post add address
router.route('/add-address').post(auth.userAuth,ordercontroller.postAddress)

// get checkout page
router.get('/check-out',auth.userAuth,ordercontroller.getCheckOut)

// post checkout page
router.post('/check-out',ordercontroller.postCheckOut)

router.get("/logout", userControllers.getLogout);

module.exports = router;
