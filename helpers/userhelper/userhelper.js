const DB = require("../../models/connection");
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const { user } = require("../../models/connection");

module.exports = {
  // signup helper
  dosignUp: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let email = data.email;
        let userexist = await DB.user.findOne({ email: email });
        if (userexist) {
          resolve({ finded: true });
        } else {
          let hashedPassword = await bcrypt.hash(data.password[0], 10);
          console.log(hashedPassword);
          let userdata = new DB.user({
            username: data.username,
            email: data.email,
            Password: hashedPassword,
            phonenumber: data.mobile,
          });
          await userdata.save().then((data) => {
            resolve({ finded: false });
          });
        }
      } catch (error) {
        throw error;
      }
    });
  },

  // login helper

  doLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let email = data.email;
        await DB.user.findOne({ email: email }).then((user) => {
          let response = {};
          if (user) {
            console.log("iffffff");
            if (!user.status) {
              bcrypt.compare(data.password, user.Password).then((loginTrue) => {
                if (loginTrue) {
                  response.user = user;
                  response.status = true;
                  resolve(response);
                } else {
                  resolve({ status: false });
                }
              });
            } else {
              resolve({ blocked: true });
            }
          } else {
            resolve({ status: true });
          }
        });
      } catch (error) {
        throw error;
      }
    });
  },

  // shop page
  getShop: () => {
   return new Promise(async (resolve, reject) => {
      try {
        console.log("fun is here");
        await DB.Product.find().then((product) => {
          if (product) {
            console.log("hi police ");
            resolve(product);
          } else {
            console.log("product not found");
          }
        });
      } catch (error) {
        throw error;
      }
    });
  },
};
