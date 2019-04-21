// Imports
const fastify = require('fastify')({ logger: true })
const userHandler = require('./handlers/user')
const authHandler = require('./handlers/auth')
const ptodoHandler = require('./handlers/personal-todo')
const stodoHandler = require('./handlers/shared-todo')


// Auth Routes

fastify.post('/auth/login',authHandler.userLogin)

// User Routes

fastify.post('/user/register',userHandler.registerUser)
fastify.post('/reset/password',userHandler.resetPassword)

// Personal Todolist Routes

fastify.post('/personaltodo/', ptodoHandler.addPersonalTodo)
fastify.get('/personaltodo/', ptodoHandler.fetchPersonalTodo)
fastify.put('/personaltodo', ptodoHandler.updatePersonalTodo)
fastify.delete('/personaltodo', ptodoHandler.deletePersonalTodo)

// Shared Todolist Routes

fastify.post('/colaborativetodo', stodoHandler.addSharedTodo)
fastify.get('/colaborativetodo', stodoHandler.fetchSharedTodo)
fastify.put('/colaborativetodo', stodoHandler.updateSharedTodo)
fastify.delete('/colaborativetodo', stodoHandler.deleteSharedTodo)



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


module.exports = start