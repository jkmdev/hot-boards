import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';

import Upload from '../../pages/upload/upload.js';

import styles from './board-info.css';

class BoardInfo extends Component {
  
  render() {
    return (
      <Paper className={styles.info} elevation={1}>
        <Upload />
      </Paper>
    );
  }
}

export default BoardInfo; 