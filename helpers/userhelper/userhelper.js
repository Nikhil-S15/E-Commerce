const DB = require('../../models/connection')
const bcrypt = require('bcrypt');
const { name } = require('ejs');
const { user } = require('../../models/connection');

module.exports=
{
    // signup helper
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
    },

    // login helper

    doLogin:(data)=>
    {
        return new Promise(async (resolve, reject) => {
            try {

                let email = data.email
                await DB.user.findOne({email:email}).then((user)=>
                {
                    console.log(user);
                    let response = {}
                    if(user)
                    {
                        console.log('iffffff');
                        if(!user.status)
                        {
                            bcrypt.compare(data.password , user.Password).then((loginTrue)=>{
                                if(loginTrue){
                                    response.user = user
                                    response.status = true
                                    resolve(response)
                                }
                                else{
                                    resolve({status:false})
                                }

                            })
                        }
                            else{
                                resolve({blocked:true})
                            }
                        }
                        else{
                            console.log('elseeeee');
                        
                        resolve({status:true})
                        }
                    
                
                })
                
            } catch (error) {
                throw error
                
            }
        })

    }
}