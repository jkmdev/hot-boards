import React, { Component } from "react";
import Nav from './components/layout/nav.js';
import Board from './components/pages/board/board.js';
import CssBaseline from '@material-ui/core/CssBaseline';

require('dotenv').config();

class App extends Component {

  render() {
    return (
      <div>
        <header>
        <CssBaseline />
          <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
          </meta>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </header>
        <Nav />
        <Board />
      </div>
    );
  }
}

export default App;