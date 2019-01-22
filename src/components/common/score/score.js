import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';

import styles from './score.css';

class ListItem extends Component {
  render() {
    return (
      <div className={styles.score}>
        <Typography variant="h5">
            <div className={styles.text}>
                {this.props.score}
            </div>
        </Typography>
      </div>
    );
  }
}

export default ListItem; 