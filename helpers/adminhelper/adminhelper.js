const dbAdmin = require("../../models/connection");
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const { response } = require("express");

module.exports = {
  doLogin: (data) => {
    return new Promise((resolve, reject) => {
      try {
        let email = data.email;
        dbAdmin.admin.findOne({ email: email }).then(async (admins) => {
          if (admins) {
            await bcrypt
              .compare(data.password, admins.password)
              .then((loginTrue) => {
                if (loginTrue) {
                  resolve(admins);
                } else {
                  resolve(false);
                }
              });
          } else {
            resolve(false);
          }
        });
      } catch (error) {
        throw error;
      }
    });
  },

  // get user list
  getUserList: () => {
    return new Promise((resolve, reject) => {
      try {
        dbAdmin.user.find().then((user) => {
          if (user) {
            resolve(user);
          } else {
            console.log("user not found");
          }
        });
      } catch (error) {
        throw error;
      }
    });
  },

  // user-status
  changeUserStatus:(userId,status)=>
  {
return new Promise((resolve, reject) => {
  try {
    dbAdmin.user.updateOne({_id:userId},{$set:{status:status}}).then((response)=>
    {
      if(response)
      {
        resolve(response)
      }
      else{
        console.log("user not found");
      }
    })
  } catch (error) {
    throw error
  }
})
  },

  // post add category
  postAddCategory: (data) => {
    try {
      return new Promise((resolve, reject) => {
        dbAdmin.Category.findOne({ category: data.category }).then(
          async (category) => {
            if (!category) {
              let category = dbAdmin.Category(data);
              await category.save().then(() => {
                resolve({ status: true });
              });
            } else {
              if (!category.sub_category.includes(data.sub_category)) {
                dbAdmin.Category.updateOne(
                  { category: data.category },
                  { $push: { sub_category: data.sub_category } }
                ).then(() => {
                  resolve({ status: true });
                });
              } else {
                resolve({ status: false });
              }
            }
          }
        );
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  /* GET editCategory Page. */
  getEditCategory: (catId) => {
    try {
      dbAdmin.Category.findById(catId).then((category) => {
        if (category) {
          resolve;
        }
      });
    } catch (error) {}
  },
  // post add product
  postAddProduct: (data) => {
    try {
      return new Promise((resolve, reject) => {
        let product = new dbAdmin.Product(data);
        product.save().then(() => {
          resolve();
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  // get edit-product
getEditProduct:(proId)=>
{
return new Promise((resolve, reject) => {
  try {
    dbAdmin.Product.findById(proId).then((product)=>
    {
      if(product)
      {
        resolve(product)
      }
      else{
        console.log('product not found');
      }
    })
  } catch (error) {
    throw error;
  }
})
},

// delete product
deleteProduct:(proId)=>
{
  return new Promise((resolve, reject) => {
    try {
        dbAdmin.Product.findByIdAndDelete({ _id: proId}).then((response)=>
        {
          if(response)
          {
            resolve({status : true})
          }
          else{
            resolve({staus : false})
          }
        })
    } catch (error) {
      throw error
    }
  })
},

// post edit product
postEditCategory: (data) => {
  try {
      return new Promise((resolve, reject) => {
          categoryModel.Category.find().then((category) => {

          })
      })
  } catch (error) {
      console.log(error.message);
  }
},

  // get product list

  getProductList:()=>
  {
    console.log('like uor');
    return new Promise((resolve, reject) => {
      try {
        dbAdmin.Product.find().then((product)=>
        {
          if(product)
          {
            resolve(product)
          }
          else{
            console.log('product not found');
          }
        })
      } catch (error) {
        throw error
      }
    })
  }

};
