const FCM = require('fcm-node');
const tk = require('../handlers/auth')
const serverKey = 'AAAADES0PLk:APA91bEyKg0fBfMlN7scA1aY698562h-XtQRSLM_ocgySTXz9T9bh36BqzTJ6ZXfK8r-zdtpavlnm58xgYpCej0qSuOGVKo9OJjNpuUUFRTfKVPPXKUqMvCpvLLjYl_VAx1mpZ0Uig2x'
const fcm = new FCM(serverKey);


exports.sendNotification = async ( title, body , data) => {
    tk.getUserTokens().then(tokens=>{
    if (tokens) {
      tokens.forEach(token => {
        const message = {
            to: token,
          notification: {
            title,
            body
          },
          data : data
        };
        fcm.send(message, function(err, response) {
          if (err) {
            console.log('Something has gone wrong!');
          } else {
            console.log('Successfully sent with response:', response);
          }
        });
      });
    }
    })
}