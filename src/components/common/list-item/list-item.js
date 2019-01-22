import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Score from '../score/score';

import styles from './list-item.css';

class ListItem extends Component {
  render() {
    return (
      <div className="content">
        <Paper className={styles.post} elevation={1}>
          <Grid container spacing={24} alignItems="center">
            <Grid item>
              <Score score={this.props.score}></Score>
            </Grid>
            <Grid item xs={12} sm justify="center" container>
              <Grid item xs={12}>
                <Typography variant="h6">
                {this.props.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom>
                  {this.props.content}
                </Typography>
              </Grid>
              <Grid container item >
                <Typography variant="caption">
                  Posted by {this.props.owner} - {this.props.commentCount} Comments
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default ListItem; 