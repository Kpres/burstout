const createError = require('http-errors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const logger = require('morgan')
const http = require('http')
const socket = require('socket.io')
const debug = require('debug')('burstout:server')
const questions = require('./questions.js')


var port = process.env.PORT || 5000
app.set('port', port)

// Middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'front-end/build')))

app.use(bodyParser.json({ type: 'application/json' }))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const users = []
const server = http.createServer(app)
const io = socket(server)
let questionsModify
let index
io.sockets.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`)
  var id = socket.id

  // Someone tried to login. If that user name
  // hasn't been added, add them. Otherwise throw
  // an alery
  socket.on('addUser', (username) => {
    console.log(`Got user ${username}`)
    // Add the users and emit the new lists of
    // uses.
    // Check if the user in the list
    var found = false
    for (var i = 0; i < users.length; i++) {
      if (users[i].name === username){
        found = true
      }
    }
    if (!found) {
      users.push({
        name: username,
        picture: 'random',
        points: 0,
        id: id
      })
      socket.emit('userAdded', username);
      io.emit('users', users)
    } else {
      socket.emit('userAdded', false);
    }
  })
  socket.on('adminStart', () => {
    // Whenevner a game starts make a copy of all questions
    questionsModify = JSON.parse(JSON.stringify(questions))
    // Randomly select a question to use
    index = Math.floor(Math.random() * Math.floor(questionsModify.length))
    socket.broadcast.emit('start')
    socket.broadcast.emit('setQuestion', questionsModify[index])

  })
  // Sends a list of indice of questions that have been
  // corrected answered
  socket.on('questionAnswered', (answered) => {
    let answers = questionsModify[index].answers
    // Mark the questions that have been answered
    for (var i=0; i<answered.length; i++) {
      answers[answered[i]].answered = true
    }
    // Update all other clients with the new set of answers
    socket.broadcast.emit('questionAnswered', answers)

    // Update the points of the user with the
    // matching socket id
    for (var i=0; i<users.length; i++) {
      if(users[i].id === id) {
        users[i].points = users[i].points + answered.length
      }
    }
    io.emit('users', users)
  })

})

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)


/**
 * Event listener for HTTP server "error" event.
 */

function onError (error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening () {
    var addr = server.address()
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
    debug('Listening on ' + bind)
  }