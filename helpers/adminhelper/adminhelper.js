const dbAdmin = require ('../../models/connection')
const bcrypt = require('bcrypt')

module.exports = 
{
    doLogin:(data)=>
 
    {
        console.log(data,'llll');
        return new Promise((resolve, reject) => {
            try {
                let email = data.email
                dbAdmin.admin.findOne({email:email}).then(async (admins)=>
                {
                    if(admins)
                    {
                        await bcrypt.compare(data.password,admins.password).then((loginTrue)=>
                        {
                            if (loginTrue) {
                                resolve(admins)
                            }else
                            {
                                resolve(false)
                            }
                            
                        })
                    }
                    else{
                        resolve(false)
                    }
                })
            } catch (error) {
                throw error
            }
        })
    }
    
}