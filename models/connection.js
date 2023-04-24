const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/E-Commerce")
  .then(() => console.log("DataBase Connected Successfully"))
  .catch((err) => console.log(err.message));

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  brand: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  category: {
    type: String,
  },
  img: {
    type: Array,
  },
});

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
  },
  sub_category: {
    type: Array,
  },
});
const cartSchema = new mongoose.Schema({

  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
  },

  cartItems: [
      {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
          quantity: { type: Number, default: 1 },
          price: { type: Number },
      },
  ],

})
const orderSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  },

  orders: [
      {
          fname: { type: String },
          lname: { type: String },
          phone: { type: Number },
          paymentMethod: { type: String },
          paymentStatus: { type: String },
          totalPrice: { type: Number },
          totalQuantity: { type: Number },
          productDetails: { type: Array },
          shippingAddress: { type: Object },
          paymentMethod: String,
          status: {
              type: Boolean,
              default: true
          },
          paymentType: String,
          createdAt: {
              type: Date,
              default: new Date()
          },
          orderConfirm: { type: String, default: "ordered" }
      }
  ]
})

const addressSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
  },

  Address: [
      {
          fname: { type: String },
          lname: { type: String },
          street: { type: String },
          appartment: { type: String },
          city: { type: String },
          state: { type: String },
          zipcode: { type: String },
          phone: { type: String },
          email: { type: String }
      }
  ]

})

module.exports = {
  user: mongoose.model("user", userschema),
  admin: mongoose.model("admin", adminSchema),
  Product: mongoose.model("product", productSchema),
  Category: mongoose.model("category", categorySchema),
  Cart : mongoose.model('cart',cartSchema),
  Address :mongoose.model('address',addressSchema),
  Order : mongoose.model('order',orderSchema),
};
