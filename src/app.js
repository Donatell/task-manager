// import express
const express = require('express');

// connect to mongoDB
require('./db/mongoose.js');

// import routers
const usersRouter = require('./routers/users.js')
const tasksRouter = require('./routers/tasks.js')

// setup express server
const app = express();

// recognize incoming requests as JSON objects
app.use(express.json())

// use routers
app.use(usersRouter)
app.use(tasksRouter)

module.exports = app
