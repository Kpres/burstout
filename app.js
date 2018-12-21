const createError = require('http-errors')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const logger = require('morgan')
const http = require('http')
const socket = require('socket.io')
const debug = require('debug')('burstout:server')


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
io.sockets.on('connection', (socket) => {
  socket.on('userAdded', (username) => {
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
        picture: 'random'
      })

      io.emit('user_addition_sucess', true);
    }else{
      
      io.emit('user_addition_sucess', false);
    }
    console.log(users)
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