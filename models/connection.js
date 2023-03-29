
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
}

    }
)

module.exports = {
    user: mongoose.model("user", userschema)
}