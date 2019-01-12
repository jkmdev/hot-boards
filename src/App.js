import React, { Component } from "react";
import Nav from './components/layout/nav.js';
import Board from './components/pages/board/board.js';

// import axios from "axios";

class App extends Component {

  state = {
    data: []
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("/boards/General")
      .then(data => {
        console.log(data.json())
      })
      .then(res => this.setState({ data: res.data }));
  };

  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <Nav />
        <Board />
      </div>
    );
  }
}

export default App;