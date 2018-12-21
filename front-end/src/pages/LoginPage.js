import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  paper: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    position: 'relative',
    top: '40%',
    transform: 'translateY(-50%)',
  },
})

class LoginPage extends Component {
  state = {
    username: ''
  }

  handleChange = event => {
    this.setState({
      username: event.target.value
    })
  }

  render() {
    const { classes, handleAddUser } = this.props
    const { username } = this.state
    return (
      <div className={classes.paper}>
        <Typography variant="h2">
          Burstout!
        </Typography>
        <Typography variant="h4">
          Enter a name
        </Typography>
        <form className={classes.form} autoComplete="off">
          <FormControl
            margin="normal"
            required
            fullWidth
          >
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              id="email"
              name="email"
              autoFocus
              onChange={this.handleChange}
              value={username}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleAddUser(username)}
          >
            Start
          </Button>
        </form>
      </div>
    )}
  }

  export default withStyles(styles)(LoginPage)
