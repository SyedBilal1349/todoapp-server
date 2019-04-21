//Imports
const fastify = require('fastify')({ logger: true })
const userHandler = require('./handlers/user')
// const authHandler = require('./handlers/auth')
// const ptodoHandler = require('./handlers/personalTodo')
// const stodoHandler = require('./handlers/sharedTodo')


//Auth Routes
// fastify.post('/auth/login',authHandler.userLogin)

// User Routes
fastify.post('/user/register',userHandler.registerUser)
fastify.post('/reset/password',userHandler.registerUser)

//Personal Todolist Routes


//Shared Todolist Routes






// Server Connection Script
const start = async () => {
    try {
      await fastify.listen(3000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }


start()             // Starts the Server 


