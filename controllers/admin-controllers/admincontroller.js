const express = require('express')
const adminHelper = require('../../helpers/adminhelper/adminhelper')
const { getLogin } = require('../user-controller/registerHelper')


module.exports = {

getDashboard:(req,res)=>
{
    
    res.render('admin/dashboard',{layout: 'admin-layout'})
},

// get login admin
getLogin:(req,res)=>
{
    console.log('getttttttttt');
    res.render('admin/login',{layout:'admin-layout'})

},

// post login admin
postLogin:(req,res)=>
{
    console.log('posttttttt');
    let data = req.body
    console.log(data,'kkkk');
    adminHelper.doLogin(data).then((loginAction)=>
    {
        if(loginAction)
        {
            console.log('if',loginAction);
            req.session.admin = loginAction
            res.render('admin/dashboard',{layout : 'admin-layout'})
        }
        else{
            console.log('else');
            res.redirect('/admin')
        }
    })
},

// get add product

getAddProduct:async (req,res)=>
{ 
    console.log('roshan ');
    res.render('admin/addproduct',{layout: 'admin-layout'})
},

getAddCategory:(req,res)=>
{
   res.render('admin/addcategory',{layout: 'admin-layout'})
},
}