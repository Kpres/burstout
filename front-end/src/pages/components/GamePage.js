import React, { Component } from 'react';
import "./GamePage.css";

export class GamePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            answers: ["Connecticut"],
            current_question: "States of America",
            input: "",
        };
    }

    getAnswer = (e) => {
        if(e.target.value.length >= 3){
            console.log(e.target.value);
            this.setState({input: ""});
        }else{
            this.setState({input: e.target.value});
        }
    }

    render() {
        return(
            <div className = "GameBody">
                <div className = "current_question"> Question: {this.state.current_question}</div>
                <div className = "background">
                    
                    <div className = "chalkboard">
                        {this.state.answers}
                    </div>
                </div>
                
                <div className = "inputwidget">
                    <input className = "input" type = "text" value = {this.state.input} onChange = {this.getAnswer}></input>
                </div>
                
                <div className = "points">
                    Points: 
                    <span className = "pointvalue">{this.state.points}</span>
                </div>

                
            </div>

        )
    }

}

