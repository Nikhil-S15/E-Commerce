const DB = require('../../models/connection')
const bcrypt = require('bcrypt');
const { name } = require('ejs');

module.exports=
{
    dosignUp:(data)=>
    {
        console.log(data);
        return new Promise(async (resolve, reject) => {
            try {
                let email = data.email
               let userexist= await DB.user.findOne({email:email})
               console.log(userexist);
               if(userexist)
               {
                resolve({finded : true})
               }
               else{
                let hashedPassword = await bcrypt.hash(data.password[0],10)
                console.log(hashedPassword);
                let userdata = new DB.user(
                {
                   username : data.username,
                   email : data.email,
                   Password : hashedPassword,
                   phonenumber : data.mobile

                })
                await userdata.save().then((data)=>
                {
                    resolve({finded : false})
                })
               }

            } catch (error) {
                throw error
                
            }
        })
    }
}