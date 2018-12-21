import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  startButton: {
    marginLeft: "20%",
    marginRight: "20%",
    marginTop: "20%"
  }
})

function AdminPage({ classes, handleStartGame, handleEndGame }){
  return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.toolbarText}
            >
              Welcome Admin
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.startButton}>
          <Button
            variant="outlined"
            onClick={handleStartGame}
            color="primary"
            size="large"
            style={{
              width: "100%"
            }}
          >
          START GAME
          </Button>
        </div>
        <div className={classes.startButton}>
          <Button
            variant="outlined"
            onClick={handleEndGame}
            size="large"
            style={{
              width: "100%",
              color: "red",
              borderColor: "red"
            }}
          >
          STOP GAME
          </Button>
        </div>
      </div>
  )
}

export default withStyles(styles)(AdminPage)
