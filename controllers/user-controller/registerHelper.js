
const express = require('express')
const session = require ('express-session')
const userHelper = require ('../../helpers/userhelper/userhelper')



module.exports=
{

    getHomepage:(req,res)=>
    {
        res.render('user/home')

    },
    getLogin:(req,res)=>
    {
       res.render('user/login') 
    },
    getSignup:(req,res)=>
    {
        res.render('user/sign-up')

    },
    postSignup:(req,res)=>
    {
        let data = req.body
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
    }
}