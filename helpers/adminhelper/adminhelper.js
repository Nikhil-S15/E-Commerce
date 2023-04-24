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

 /* Post EditProduct Page. */
 postEditProduct: (proId, product, image) => {
console.log("hello");
  
      return new Promise(async(resolve,_reject) => {
          await dbAdmin.Product.updateOne({ _id: proId },
              {
                  $set:
                  {
                      name: product.name,
                      brand: product.brand,
                      description: product.description,
                      price: product.price,
                      quantity: product.quantity,
                      // category: product.category,
                      img: image
                  }
              }).then((response) => {
                  resolve(response)
              })
      })
  
},

  //to get images for edit product
  getPreviousImages: (proId) => {
    try {
        return new Promise(async (resolve, reject) => {
            await dbAdmin.Product.findOne({ _id: proId }).then((response) => {
                resolve(response.img)
            })
        })
    } catch (error) {
        console.log(error.message);
    }

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
        dbAdmin.Product.find().sort({_id:-1}).then((product)=>
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
        throw console.log("error messeage");
      }
    })
  },
   /* Delete Category Page. */
   deleteCategory: (catId) => {
    try {
        return new Promise((resolve, reject) => {
        dbAdmin.Category.findByIdAndDelete(catId).then((res) => {
                if (res) {
                    resolve({ status: true })
                } else {
                    resolve({ status: false })
                }
            })
        })

    } catch (error) {
        console.log(err.message);
    }
}

};
