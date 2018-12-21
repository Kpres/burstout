import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import io from 'socket.io-client'
import { Route } from "react-router-dom"

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
      username: null,
      players: []
    }
    this.socket = io('http://localhost:5000')
    this.socket.on('connect', () => {
      console.log('client connected')
    })
    this.socket.on('users', (users) => {
      this.setState({
        players: users
      })
    })
  }

  handleAddUser = username => event => {
    // Tell the server that a user was added
    this.socket.emit('userAdded', username)
    this.setState({
      username: username
    })
  }

  render() {
    const { classes } = this.props
    const { username, players } = this.state

    return (
      <div className={classes.root}>
        <Route
          exact path="/"
          render={username
        ? <HomePage
            players={players}
            message={"Waiting for host"}
          />
        : <LoginPage
            handleAddUser={this.handleAddUser}
          />
        }
        />
        <Route
          exact path="/admin"
          render={
            (props) =>
            <AdminPage/>
          }
        />
      </div>
    )
  }
}

export default withStyles(styles)(App)
