import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import Score from '../score/score';

import styles from './list-item.css';

const ListItem = ({
  score, title, content, owner, commentCount,
}) => (
  <div className="content">
    <Paper className={styles.post} elevation={1}>
      <Grid container spacing={24} alignItems="center">
        <Grid item>
          <Score score={score} />
        </Grid>
        <Grid item xs={12} sm justify="center" container>
          <Grid item xs={12}>
            <Typography variant="h6">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
              {content}
            </Typography>
          </Grid>
          <Grid container item>
            <Typography variant="caption">
              Posted by
              {owner}
              -
              {commentCount}
              Comments
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </div>
);

ListItem.propTypes = {
  score: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.string,
  owner: PropTypes.string,
  commentCount: PropTypes.number,
};

ListItem.defaultProps = {
  score: 0,
  title: 'No Title Defined',
  content: 'No Content Provided',
  owner: 'No owner provided',
  commentCount: 0,
};


export default ListItem;
