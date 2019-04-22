// Imports
const fire = require('../firebase/index')
const fcm = require('../firebase/cloud-messaging')
const authToken = require("../handlers/auth")


// Add Collaborative Todo
exports.addSharedTodo = async (req, res) => {
    const obj = req.body;
    authToken.authenticateToken(req.headers.token).then(userObj => {  // Authenticate User
        if (userObj) {
            fire.fbase.database().ref('todos/shared').push({          // Post data in database
                title: obj.title,
                todo: obj.todo,
                status: "pending",
                createdAt: obj.time,
                updatedAt: obj.time,
                createdBy: userObj.user_id
            })
                .then(todo => {
                    if (todo) {
                        fcm.sendNotification(userObj.email + " " +'added a todo', 'Todo', {});  // Sends Notification to all connected devices
                        res.send('todo added successfully')
                    }
                    else {
                        res.send("cant create todo")
                    }
                })
                .catch(err => {
                    res.send(err)
                });
        } else {
            res.send("can't authenticate user")
        }
    }).catch(err => {
        res.send(err)
    });
};

// Fetch All Collaborative Todo
exports.fetchSharedTodo = async (req, res) => {
    authToken.authenticateToken(req.headers.token).then(auth => {    // Authenticate User
      if (auth) {
        fire.fbase.database().ref('todos/shared/').on('value', function(snapshot) {   // fetch all the objects from database
            const data = snapshot.val();
            const todos = {};
            Object.keys(data).forEach(item => {         // Loop through data array to make active todos objects
              if (data[item].status == "active") {
                todos[item] = data[item];
              }
            });
            if(todos)
           res.send(todos)
           else
           res.send("No acitve todos found")
          });
      } else {
       res.send("cant authenticate user")
      }
    });
};

// Update Collaborative Todo
exports.updateSharedTodo = async (req, res) => {
    const obj = req.body;
    authToken.authenticateToken(req.headers.token).then(auth => {   // Authenticate User
      if (auth) {
        fire.fbase.database().ref('todos/shared/' + obj.id)     // Update the todo with the given Id
          .set({
            title: obj.title,
            todo: obj.todo,
            status: obj.status,
            updatedAt: new Date().getTime()
          })
          .then(todo => {
          if(todo){
          fcm.sendNotification(auth.email + " " +'updated a todo' + " " + obj.id, 'Todo', {});  // Send notification to all connected devices
          res.send("todo updated")
          }
          else
          res.send("Can't update todo")
          })
          .catch(err => {
            res.send(err)
          });
      } else {
       res.send("cant authenticate user")
      }
    });
};

// Delete Collaborative Todo
exports.deleteSharedTodo = async (req, res) => {
    const body = req.body;
    const taskId = body.id
    authToken.authenticateToken(req.headers.token).then(auth => { // Authenticate User
      if (auth) {
        fire.fbase.database().ref('todos/shared/' + taskId) // Delete the task with the given Id
          .set({
            isDeleted: true,
            updatedAt: new Date().getTime()
          })
          .then(todo => {
            if(todo)
            {
            fcm.sendNotification(auth.email + " " +'deleted a todo' + " " + obj.id, 'Todo', {});  // Sends notification to all connected devices
            res.send("Todo deleted with success")
            }
            else
            res.send("unable to delete todo")
          })
          .catch(err => {
           res.send(err)
          });
      } else {
       res.send("cant authenticate user")        
      }
    });
  };
