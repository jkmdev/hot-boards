import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class Nav extends Component {
  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit" >
            Hot Boards
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Nav; 