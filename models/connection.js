
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
mongoose.connect('mongodb://localhost:27017/E-Commerce')
.then(()=>console.log('DataBase Connected Successfully'))
.catch((err)=>console.log(err.message))

const userschema = new mongoose.Schema({

username: {
    type: String,
    required: true,
    unique: true
},
Password: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true
},
phonenumber: {
    type: Number,
    required: true,
    unique: true,
},
status:{
    type : Boolean,
    default : false,
}

    })

 const adminSchema = new mongoose.Schema({
    email:{
        type : String
    },
    password:{
        type : String
    }
})
const productSchema = new mongoose.Schema({
    name:{
        type : String
    },
    brand:{
        type : String
    },
    description:{
        type : String
    },
    price:{
        type : Number
    },
    quantity:{
        type : Number
    },
    category:{
        type : String
    },
    img:{
        type : Array
    }
})


module.exports = {
    user: mongoose.model("user", userschema),
    admin: mongoose.model("admin", adminSchema),
    Product : mongoose.model('product',productSchema)
}