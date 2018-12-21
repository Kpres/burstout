import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import LobbyList from './components/LobbyList'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  toolbarText: {
    flex: 1
  }
})

function HomePage({ classes, players, message }) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.toolbarText}
          >
            {message}
          </Typography>
          <CircularProgress color="secondary"/>
        </Toolbar>
      </AppBar>
      <LobbyList players={players}/>
    </div>
  )
}

export default withStyles(styles)(HomePage)
