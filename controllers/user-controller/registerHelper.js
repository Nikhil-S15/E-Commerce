
const express = require('express')
const session = require ('express-session')
const userHelper = require ('../../helpers/userhelper/userhelper')


let user
module.exports=
{
    // render homepage
    getHomepage:(req,res)=>
    {
        if(req.session.user)
        {
            console.log('session inddddd');
            user = req.session.user
            res.render('user/home',{user})
        }else
        {
            user = false
            console.log('session illlaaaa');
            res.render('user/home',{user})
        }
        

    },
    // render loginpage
    getLogin:(req,res)=>
    {
       res.render('user/login',{user}) 
    },
    // render signup page
    getSignup:(req,res)=>
    {
        res.render('user/sign-up',{user})

    },
    postSignup:(req,res)=>
    {
        let data = req.body
        console.log(req);
        userHelper.dosignUp(data).then((response)=>
        {
            console.log(response);
            if(response.finded){
                res.json(false)
            }
            else{
                res.json(true)
            }

        })
    },
    

    // postlogin method
    postLogin:(req,res)=>
    {
        let data=req.body
        userHelper.doLogin(data).then((loginAction)=>
        {
            console.log(loginAction);
            if (loginAction.status) {
                req.session.user = loginAction.user
                req.session.status = true
                user = req.session.user
                res.render('user/home',{user})
            } else {
                user = false
                res.render('user/login',{user})
            }
        })
    },

    getLogout:(req,res)=>
    {
        req.session.user = null;
        req.session.status = false
        res.redirect('/')
    }

}