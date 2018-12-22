import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  Gamebody: {
    height: "calc(100% - 56px)"
  },
  background: {
    background: "rgba(165, 91, 42, 0.911)",
    padding: "15px",
    margin: "1% 5% 5% 5%",
    height: "60%",
    borderRadius: "5px",
    boxShadow: "10px 10px 10px rgb(170, 170, 170)"
  },
  chalkboard: {
    height: "90%",
    padding: "15px",
    color: "white",
    fontSize: "150%",
    fontFamily: "Chalkduster, fantasy",
    background: "grey",
    margin: "5px",
    borderRadius: "5px",
    border: "1px solid rgb(65, 65, 65)",
    textAlign: "left",
    // -moz-box-shadow:    "inset 0 0 10px #000000",
    // -webkit-box-shadow: "inset 0 0 10px #000000",
    // box-shadow:         "inset 0 0 10px #000000",
  },
  inputwidget: {
    backgroundColor: "rgba(211, 211, 211, 0.514)",
    height: "50px",
    width: "50%",
    margin: "auto",
    marginTop: "-3%",
    textAlign: "center",
    borderRadius: "5px",
    paddingTop: "5px",
    boxShadow: "5px 5px 5px rgb(170, 170, 170)",
  },
  input: {
    height: "70%",
    width: "90%",
    fontSize: "120%",
    borderRadius: "5px",
  },
  points: {
    margin: "1%",
    fontSize: "250%",
    fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
    color: "grey",
  },
  pointvalue: {
    margin: "3px"
  },
  currentQuestion: {
    color: "grey",
  }
})

class GamePage extends Component{
  constructor(props) {
    super(props)
    console.log('Game starting')
    this.state = {
        points: 0,
        input: '',
        questionName: '',
        answers: []
    }
    this.correct = new Audio("https://burstout.herokuapp.com/correct.mp3")
    this.wrong = new Audio("https://burstout.herokuapp.com/wrong.mp3")
    this.almostOver = new Audio("https://burstout.herokuapp.com/almost_over.mp3")
    this.already_answered = new Audio("https://burstout.herokuapp.com/already_answered.mp3")
    this.props.socket.on('setQuestion', (question) => {
      this.setState({
        questionName: question.question,
        answers: question.answers
      })
    })
    this.props.socket.on('questionAnswered', (newAnswers) => {
      this.setState({
        answers: newAnswers
      })
    })
  }

  handleChange = (event) => {
    let value = event.target.value
    if (value.length >= 3){
      // We need to check if the answer was corrent
      this.setState((prevState) => {
        // Make a copy of the previous answers
        let newAnswers = prevState.answers.slice()

        // Did the user get any correct?
        let isAnswer = this.checkMatch(value, prevState.answers)

        // Loop through the correct answers
        // This is beacuse a 3 word str can match multiple
        // answers
        if (isAnswer.length > 0) {
          let index
          for (var i=0; i<isAnswer.length; i++) {
            index = isAnswer[i]
            // If the answer has already been answered
            // play a sound and null the text entry
            if (newAnswers[index].answered) {
              this.already_answered.play()
              return {input: ""}
            }
            newAnswers[index].answered = true
          }
          // Otherwise play a correct answer sound,
          // clear the input, display the answer(s), and
          // update the points
          this.correct.play()
          // Notify all other players of the answer
          this.props.socket.emit('questionAnswered', isAnswer)
          return {
            answers: newAnswers,
            input: "",
            points: prevState.points + isAnswer.length
          }
        } else {
          // If the input did not match an answer
          // play an incorrect sound.
          this.wrong.play()
          return { input: "" }
        }
      })
    } else {
      // If the string is less than 3 char
      this.setState({input: value})
    }
  }

  checkMatch = (search, answers) => {
    let result = []
    for (var i=0; i<answers.length; i++) {
      let answer = answers[i]
      if (answer.answer.slice(0, 3) === search) {
        result.push(i)
      }
    }
    return result
  }

  render() {
    const {
      classes,
      seconds,
      question
    } = this.props
    const {
      points,
      questionName,
      answers
    } = this.state

    if (seconds === 6){
      this.almostOver.play()
    }

    return(
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="subtitle2"
              color="inherit"
              style={{flex: 1}}
            >
              Q?: {questionName}
            </Typography>
            <Typography variant="subtitle2" color="inherit">
              TIME: {seconds}
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={classes.Gamebody}>
          <div className={classes.background}>
            <div className={classes.chalkboard}>
              <ul style={{margin: "auto", listStyleType: "none"}}>
                {answers.map((answer, index) => {
                  if (answer.answered) {
                    return <li key={answer.answer}>
                      {index+1}. {answer.answer}
                    </li>
                  } else {
                    return  <li key={answer.answer}>
                      {index+1}. ...
                    </li>
                  }
                }
                )}
              </ul>
            </div>
          </div>
          <div className={classes.inputwidget}>
            <input
              className={classes.input}
              type="text"
              value={this.state.input}
              onChange={this.handleChange}
            />
          </div>
          <div className={classes.points}>
            Points:
            <span className={classes.pointvalue}>
              {points}
            </span>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(GamePage)

