// import express
const express = require('express');

// connect to mongoDB
require('./db/mongoose.js');

// import routers
const usersRouter = require('./routers/users.js')
const tasksRouter = require('./routers/tasks.js')

// setup express server
const app = express();

// setup port, heroku or dev port
const port = process.env.PORT || 3000;

// recognize incoming requests as JSON objects
app.use(express.json())

// use routers
app.use(usersRouter)
app.use(tasksRouter)

// start server
app.listen(port, () => {
	console.log('Server is up on port ' + port);
})