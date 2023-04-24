const cartHelpers = require('../../helpers/carthelper/cartHelper')
const orderHelpers = require('../../helpers/carthelper/orderHelper')


module.exports = {

    // Get address page
    getAddress: async (req,res)=>
    {
        var count = null
        console.log("mnunnun");
        let user  = req.session.user
        if (user)
        {
            var count = await cartHelpers.getCartCount(user._id)
            let address = await orderHelpers.getAddress(user._id)
            let orders = await orderHelpers.getOrders(user._id)

            res.render('user/profile',{user , count , address ,orders})
        }
    },

    // post addaddress
    postAddress:(req,res)=>
    {
        let data = req.body
        let userId = req.session.user._id
        orderHelpers.postAddress(data,userId).then((response)=>
        {
            res.send (response)
        })
    },

    /* GET Check Out Page */
    getCheckOut: async (req, res) => {
        let userId = req.session.user._id
        let user = req.session.user
        let total = await orderHelpers.totalCheckOutAmount(userId)
        let count = await cartHelpers.getCartCount(userId)
        let address = await orderHelpers.getAddress(userId)
        cartHelpers.getCartItems(userId).then((cartItems) => {
            res.render('user/checkOut', { user, cartItems, total, count, address })
        })
    },

    // post Check Out Page
    postCheckOut:(req,res) =>
    {
            

    },


    getProduct: (req, res) => {
        let userId = req.session.user._id;
        let orderId = req.params.id;
        orderHelpers.findProduct(orderId, userId).then((product) => {
            console.log(product, 'ooo');
            res.send(product)
        })
    },
};