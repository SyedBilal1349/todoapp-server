// const fire = require('../firebase/index')
const admin = require('../firebase/index')

exports.authenticateToken = (token) =>{
    return new Promise((resolve,reject)=>{
        admin.fbadmin.auth().verifyIdToken(token).then(auth=>{
            if(auth){
                resolve(auth)
            }
            else{
                resolve(null)
            }
        }).catch(err=>{
            console.log(err)
            resolve(null)
        })
       })
}

exports.userLogin = async(req,res)=>{
    
}