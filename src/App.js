import React, { Component } from 'react';
import logo from './logo.svg';
import {GamePage} from './Components/GamePage.js';
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <GamePage />
      </div>
    );
  }
}

export default App;
