import React, { Component } from "react";
import Nav from './components/layout/nav.js';
import Board from './components/pages/board/board.js';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

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
        <CssBaseline />
        <head>
          <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
          </meta>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </head>

        <Nav />
        <Board />
      </div>
    );
  }
}

export default App;