import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import GamePage from './pages/GamePage'
import io from 'socket.io-client'
import {
  BrowserRouter as Router, Route, Switch, Redirect
} from "react-router-dom";
import EndPage from './pages/EndPage';

const styles = theme => ({
  "@global": {
    "html, body, #root": {
      height: "100%",
      width: "100%"
    }
  },
  root: {
    height: "100%"
  }
})

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: false,
      players: [],
      start: false,
      seconds: 5,
      question: {}
    }
    this.timer = 0
    this.socket = io('http://localhost:5000')
    this.socket.on('connect', () => {
      console.log('client connected')
    })
    this.socket.on('users', (users) => {
      this.setState({
        players: users
      })
    })
    this.socket.on('userAdded', (added) => {
      if (added) {
        this.setState({
          username: added
        })
      } else {
        alert('Sorry that user name is already in use!')
      }
    })
    this.socket.on('start', () => {
      this.setState({
        start: true,
      })
    })
  }

  startTime = () => {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000)
    }
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    this.setState(({ seconds }) => {
      if (seconds === 0) {
        clearInterval(this.timer)
        // Reset game
        this.timer = 0
        return {start: false, seconds: 30}
      } else {
        return {seconds: seconds - 1}
      }
    })
  }
  handleAddUser = username => {
    // Tell the server that a user was added
    this.socket.emit('addUser', username)
  }
  handleStart = (event) => {
    this.socket.emit('adminStart')
  }

  render() {
    const { classes } = this.props
    const {
      username,
      players,
      start,
      seconds,
    } = this.state

    if (start) {
      this.startTime()
    }

    console.log(players);

    return (
      <div className={classes.root}>
        <Router>
          <Switch>
            <Route exact path="/"
              render={() => {
                if (start && username) {
                  return <Redirect to="/game" />
                }
                else if (username) {
                  return <HomePage
                            players = {players}
                            message = {"Waiting for host"}
                          />
                } else {
                  return <LoginPage
                  handleAddUser={this.handleAddUser}
                  routeToHome={username}
                />
                }
              }}
            />

            <Route
              path="/admin"
              render={() =>
                <AdminPage
                  handleStartGame={this.handleStart}
                />
              }
            />

            <Route path="/game"
              render={() => {
                if (start && username) {
                  return <GamePage
                    seconds={seconds}
                    socket={this.socket}
                  />
                }
                else {
                  return <Redirect to="/end" />
                }
              }}
            />

            <Route path="/end"
              render={() => {
                if(username && !start){
                  return <EndPage
                  players = {players}
                />
              }else{
                return <Redirect to="/" />
              }
                  
              }

            }>
            </Route>

          </Switch>
        </Router>
      </div>
    )
  }
}

export default withStyles(styles)(App)
