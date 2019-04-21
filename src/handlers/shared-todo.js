const fire = require('../firebase/index')
const fcm = require('../firebase/cloud-messaging')
const authToken = require("../handlers/auth")



exports.addSharedTodo = async (req, res) => {
    const obj = req.body;
    authToken.authenticateToken(req.headers.token).then(userObj => {
        if (userObj) {
            fire.fbase.database().ref('todos/shared').push({
                title: obj.title,
                todo: obj.todo,
                status: "pending",
                createdAt: obj.time,
                updatedAt: obj.time,
                createdBy: userObj.user_id
            })
                .then(todo => {
                    if (todo) {
                        fcm.sendNotification(userObj.email + " " +'added a todo', 'Todo', {});
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

exports.fetchSharedTodo = async (req, res) => {
    authToken.authenticateToken(req.headers.token).then(auth => {
      if (auth) {
        fire.fbase.database().ref('todos/shared/').on('value', function(snapshot) {
            const data = snapshot.val();
            const todos = {};
            Object.keys(data).forEach(item => {
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

exports.updateSharedTodo = async (req, res) => {
    const obj = req.body;
    authToken.authenticateToken(req.headers.token).then(auth => {
      if (auth) {
        fire.fbase.database().ref('todos/shared/' + obj.id)
          .set({
            title: obj.title,
            todo: obj.todo,
            status: obj.status,
            updatedAt: new Date().getTime()
          })
          .then(todo => {
          if(todo){
          fcm.sendNotification(auth.email + " " +'updated a todo' + " " + obj.id, 'Todo', {});
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

exports.deleteSharedTodo = async (req, res) => {
    const body = req.body;
    const taskId = body.id
    authToken.authenticateToken(req.headers.token).then(auth => {
      if (auth) {
        fire.fbase.database().ref('todos/shared/' + taskId)
          .set({
            isDeleted: true,
            updatedAt: new Date().getTime()
          })
          .then(todo => {
            if(todo)
            {
            fcm.sendNotification(auth.email + " " +'deleted a todo' + " " + obj.id, 'Todo', {});
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
