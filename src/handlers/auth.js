// Imports
const UAParser = require('ua-parser-js');
const fire = require('../firebase/index')
const admin = require('../firebase/index')

// Method for token authentication
exports.authenticateToken = (token) =>{
    return new Promise((resolve,reject)=>{
        admin.fbadmin.auth().verifyIdToken(token).then(auth=>{  // Firebase token verification method
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

// Login method
exports.userLogin = async(req,res)=>{
    const userObj = req.body
    const email = userObj.email;
    const password = userObj.password;
    const token = userObj.token;
    const dev = new UAParser(request.headers['user-agent']);  // library used to get device info
    fire.fbase.auth().signInWithEmailAndPassword(email, password).then(user => {  // Firebase login method
      fire.fbase.database().ref('users/' + user.user.uid + '/' + dev.getOS().name)  //  dev.getOs().name gets the device for multi device login
          .set({
            token: token
          })
          .then(chk => {
            if(chk){
            res.send("user successfully logged In")
          }
            else{
            res.send("unable to login")
            }
          }).catch(err=>{
            console.log(err)
        })
      }).catch(err=>{
        console.log(err)
    })
    
}

// Method to fetch All tokens of the connected devices
exports.getUserTokens = () => {
    return new Promise((resolve, reject) => {
      const tokens = [];
      fire.fbase.database().ref('users').on('value', function(snapshot) { // Gets all the users
          const users = snapshot.val();
          Object.keys(users).forEach(item => {  
            const dev = users[item];
            Object.keys(dev).forEach(item => {  // loop through user array to fetch tokens
              tokens.push(dev[item].token);
            });
          });
          if(tokens)
          resolve(tokens);
          else
          resolve(null)
        });
    });
 
}

