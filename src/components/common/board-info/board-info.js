import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import styles from './board-info.css';

class BoardInfo extends Component {
  render() {
    return (
      <Paper className={styles.info} elevation={1}>

  {/* <div>{this.props.title}</div>
          <div>{this.props.boardInfo}</div> */}

        <Button>
            UPLOAD
        </Button>
        
      </Paper>
    );
  }
}

export default BoardInfo; 