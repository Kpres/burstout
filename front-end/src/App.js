import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import io from 'socket.io-client'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


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
      players: [],
      added_sucess: false,
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

  handleAddUser = username => {
    // Tell the server that a user was added
    this.socket.emit('userAdded', username)
    this.setState({
      username: username
    })

    this.socket.on('user_addition_sucess', (added) => {
      this.setState({
        added_sucess: added,
      });
      return added;
    })

    //return this.state.added;
  }

  render() {
    const { classes } = this.props
    const { username, players } = this.state

    return (
      <div className={classes.root}>
        <Router>
          <Switch>
            <Route exact path = "/"
              render={
                (props) => <LoginPage
                  handleAddUser = {this.handleAddUser}
                />
              }
            />

            <Route path="/homepage"
              render={
                (props) =>
                <HomePage
                  players = {players}
                  message = {"Waiting for host"}
                />
              }
            />

            <Route path="/admin"
              render={
                (props) =>
                <AdminPage/>
              }
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default withStyles(styles)(App)
