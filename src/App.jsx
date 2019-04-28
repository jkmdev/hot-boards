import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Nav from './components/layout/nav';
import Board from './components/pages/board/board';

require('dotenv').config();

const App = () => (
  <div>
    <header>
      <CssBaseline />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </header>
    <Nav />
    <Board />
  </div>
);

export default App;
