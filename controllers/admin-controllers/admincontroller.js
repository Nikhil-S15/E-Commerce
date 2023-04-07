const { response } = require("express");
const express = require("express");
const adminHelper = require("../../helpers/adminhelper/adminhelper");
const { admin } = require("../../models/connection");
const dbAdmin = require("../../models/connection");

const { getLogin } = require("../user-controller/registerHelper");

module.exports = {
  getDashboard: (req, res) => {
    console.log(req.session, "-------");
    res.render("admin/dashboard", { layout: "admin-layout" });
  },

  // get login admin
  getLogin: (req, res) => {
    console.log(req.session);
    req.session.admin = null;
    res.render("admin/login", { layout: "admin-layout" });
  },

  // post login admin
  postLogin: (req, res) => {
    let data = req.body;
    adminHelper.doLogin(data).then((loginAction) => {
      if (loginAction) {
        req.session.admin = loginAction;
        console.log(req.session, "+++++++++++++++");
        res.render("admin/dashboard", { layout: "admin-layout" });
      } else {
        res.redirect("/admin");
      }
    });
  },

  // get userlist
  getUserList: (req, res) => {
    console.log("lllkkllkl");
    adminHelper.getUserList().then((user) => {
      res.render("admin/userList", { layout: "admin-layout", user });
    });
  },

  // user status
  changeUserStatus:(req,res)=>
  {
    let userId = req.query.id
    let status = req.query.status
    adminHelper.changeUserStatus(userId,status).then(()=>
    {
      res.send(status)
    })
  },

  // get add product

  getAddProduct: async (req, res) => {
    console.log(req.session, "??????????");
    res.render("admin/addproduct", { layout: "admin-layout" });
  },

  // get  add-Category
  getAddCategory: async (req, res) => {
    let categories = await dbAdmin.Category.find();

    res.render("admin/addcategory", { layout: "admin-layout", categories });
  },

  // post add-product
  postAddProduct: (req, res) => {
    let file = req.files;
    const fileName = file.map((file) => {
      return file.filename;
    });
    console.log(file);
    const product = req.body;
    product.img = fileName;
    adminHelper.postAddProduct(product).then(() => {
      res.redirect("/admin/dashboard");
    });
  },
  // get edit product
  getEditProduct: (req, res) => {
    let proId = req.params.id;
    adminHelper.getEditProduct(proId).then((product) => {
      console.log(product);
      res.render("admin/editproduct", { layout: "admin-layout" , product});
    });
  },

  // post edit product
  postEditProduct:async (req,res)=>
  {
    let proId = req.params.id
        let file = req.files
        let image = [];

        let previousImages = await adminHelper.getPreviousImages(proId)

        console.log(previousImages, 'oldimage');
        console.log(file, 'uploaded');


        if (req.files.image1) {
            image.push(req.files.image1[0].filename)
        } else {
            image.push(previousImages[0])
        }

        if (req.files.image2) {
            image.push(req.files.image2[0].filename)
        } else {
            image.push(previousImages[1])
        }
        if (req.files.image3) {
            image.push(req.files.image3[0].filename)
        } else {
            image.push(previousImages[2])
        }
        if (req.files.image4) {
            image.push(req.files.image4[0].filename)
        } else {
            image.push(previousImages[3])
        }

        adminHelpers.postEditProduct(proId, req.body, image).then(() => {
            res.redirect('/admin/productList')
        }) 
      
  },

  // delete product
  deleteProduct:(req,res)=>
  {
    let proId = req.params.id
    adminHelper.deleteProduct(proId).then((response)=>
    {
      res.send(response)
    })

  },

  // get product list
  getProductList: (req, res) => {
    adminHelper.getProductList().then((product) => {
      // console.log(Product);
      res.render("admin/productlist", { layout: "admin-layout", product });
    });
  },

  // post add-Category
  postAddCategory: (req, res) => {
    let data = req.body;
    adminHelper.postAddCategory(data).then((category) => {
      res.send(category);
    });
  },

  // get edit category
  getEditCategory: (req, res) => {
    let catId = req.params._id;
    adminHelper.getEditCategory(catId);
  },

  // post edit category

  postEditCategory: (req, res) => {
    let data = req.body;
    adminHelper.postEditCategory(data);
  },

  getLogout: (req, res) => {
    console.log(req.session.admin);
    req.session.admin = null;
    res.redirect("/admin");
  },
};
