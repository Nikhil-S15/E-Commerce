var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/dashboard', function(req, res) {
  res.render('admin/dashboard', { layout : 'admin-layout'});
});

module.exports = router;
