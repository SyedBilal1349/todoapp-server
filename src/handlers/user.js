// const fire = require('../firebase/index')

exports.registerUser = async (req, res) => {
    let userObj = req.body
    let email = userObj.email
    let password = userObj.password
    console.log(userObj)
    if (email && password) {
        fire.fbase.auth().createUserWithEmailAndPassword(email, password).then(user => {
            console.log(user)
            // if (user) {
            //     delete user.password
            //     res.send(user)
            //     // res.send({ success: "true", message: email + " " + "successfully registered", data : user, res })
            // }
            // else {
            //     res.send({ success: "false", message: "Can't register", data: null, res })
            // }
        })
    }
    else {
        // res.send({ success: "false", message: "Please provide complete info", data: null, res })
    }
}

exports.resetPassword = async(req,res) => { 
    let userObj = req.body
    let email = userObj.email
    if(email){
        fire.fbase.auth().sendPasswordResetEmail(email).then(res=>{
            if(res){
                // res.send({ success: "true", message: "Please check" + " "+ email + " " + "inbox for reset link", data : null , res })
            }
            else{
            // res.send({ success: "false", message: "Please provide emai address to reset password", data: null, res })
        }
        })
    }
    else{
        // res.send({ success: "false", message: "Please provide email address to reset password", data: null, res })

    }
}