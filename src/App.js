import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
const axios = require("axios");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      user: null,
      score: -1,
      message: "",
      color: "black"
    };
  }
  search(event) {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.name}`).then(response => {
      let score = -1;
      let message = "User does not exist, pick a different Github username";
      let color = "black";
      if(response.data.id) {
        score = parseInt(response.data.public_repos) + parseInt(response.data.followers);
        if(score < 20) {
          message = "Needs work";
          color = "red";
        }
        else if(score < 50) {
          message = "A decent start";
          color = "orange";
        }
        else if(score < 100) {
          message = "Doing good";
          color = "black";
        }
        else if(score < 200) {
          message = "Great job";
          color = "green";
        }
        else {
          message = "Github Elite";
          color = "blue";
        }
      }
      this.setState({
        user: response.data,
        score,
        message,
        color
      });
    }).catch(response => {
      this.setState({
        user: {},
        score: -1,
        message: "User does not exist, pick a different Github username",
        color: "black"
      })
    })
  }
  render() {
    return (
      <div className="App">
        <h1>GitHub Score</h1>
        <form onSubmit={this.search.bind(this)}>
          <p>Github Username: <input type="text" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} /></p>
          <p><button type="submit">Calculate my Github Score</button></p>
        </form>
        {this.state.user && (
          <div>
            {this.state.score >= 0 && (
              <h2>Your Score: {this.state.score}</h2>
            )}
            <h3 style={{color: this.state.color}}>{this.state.message}</h3>
          </div>
        )}
      </div>
    );
  }
}

export default App;
