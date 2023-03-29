var express = require('express');
var router = express.Router();
const userControllers=require('../controllers/user-controller/registerHelper')

router.get('/',userControllers.getHomepage)

// get login page
router.get('/login',userControllers.getLogin)

// get signup page
router.get('/signup',userControllers.getSignup)

// post signup page
router.post('/signup',userControllers.postSignup)

module.exports = router;
