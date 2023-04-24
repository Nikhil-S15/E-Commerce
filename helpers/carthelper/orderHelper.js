const express = require('express')
const { ObjectId } = require('mongodb');

const cartModel = require('../../models/connection')
const addressModel = require('../../models/connection')
const orderModel = require('../../models/connection')



module.exports = {


    // to get the total amount in the cart lising page

    totalCheckOutAmount: (userId) => {
        try {
            return new Promise((resolve, reject) => {
                cartModel.Cart.aggregate([
                    {
                        $match: {
                            user: new ObjectId(userId)
                        }
                    },
                    {
                        $unwind: "$cartItems"
                    },
                    {
                        $project: {
                            item: "$cartItems.productId",
                            quantity: "$cartItems.quantity"
                        }
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "item",
                            foreignField: "_id",
                            as: "carted"
                        }
                    },
                    {
                        $project: {
                            item: 1,
                            quantity: 1,
                            product: { $arrayElemAt: ["$carted", 0] }
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: { $multiply: ["$quantity", "$product.price"] } }
                        }
                    }
                ])
                    .then((total) => {
                        resolve(total[0]?.total)
                    })
            })
        } catch (error) {
            console.log(error.message);
        }
    },

    //to get the sub total 
    getSubTotal: (userId) => {
        try {
            return new Promise((resolve, reject) => {
                cartModel.Cart.aggregate([
                    {
                        $match: {
                            user: new ObjectId(userId)
                        }
                    },
                    {
                        $unwind: "$cartItems"
                    },
                    {
                        $project: {
                            item: "$cartItems.productId",
                            quantity: "$cartItems.quantity"
                        }
                    },
                    {
                        $lookup: {
                            from: "products",
                            localField: "item",
                            foreignField: "_id",
                            as: "carted"
                        }
                    },
                    {
                        $project: {
                            item: 1,
                            quantity: 1,

                            price: {
                                $arrayElemAt: ["$carted.price", 0]
                            }
                        }
                    },
                    {
                        $project: {
                            total: { $multiply: ["$quantity", "$price"] }
                        }
                    }
                ])
                    .then((total) => {

                        const totals = total.map(obj => obj.total)

                        resolve({ total, totals })
                    })
            })
        } catch (error) {
            console.log(error.message);
        }
    },

    // get address page
    getAddress:(userId)=>
    {
        
        return new Promise((resolve, reject) => {
            addressModel.Address.findOne({user :userId}).then((response)=>
            {
              
                resolve(response)
            })
        })
    },

    // post add address
    postAddress:(data,userId)=>
    {
        try {
            return new Promise((resolve, reject) => {
                let addressInfo = {
                    fname: data.fname,
                    lname: data.lname,
                    street: data.street,
                    appartment: data.appartment,
                    city: data.city,
                    state: data.state,
                    zipcode: data.zipcode,
                    phone: data.phone,
                    email: data.email
                }
                addressModel.Address.findOne({user : userId}).then(async(ifAddress)=>
                {
                if(ifAddress)
                {
                    addressModel.Address.updateOne(
                        {user : userId},
                        {
                            $push:{Address : addressInfo}
                        }
                    ).then((response)=>
                    {
                        resolve(response)
                    })
                }
                else{
                    let newAddress = addressModel.Address({user : userId,Address : addressInfo})
                    await newAddress.save().then((response)=>
                    {
                        resolve (response)
                    })
                }
            })
        })
        } catch (error) {

            console.log(error.message);
            
        }
    },

    getOrders: (userId) => {
        try {
            return new Promise((resolve, reject) => {
                orderModel.Order.findOne({ user: userId }).then((user) => {
                    resolve(user)
                })
            })
        } catch (error) {
            console.log(error.message);
        }
    },
};