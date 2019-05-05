import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import styles from './score.css';

const Score = ({ score }) => (
  <div className={styles.score}>
    <Typography variant="h5">
      <div className={styles.text}>
        {score}
      </div>
    </Typography>
  </div>
);

Score.propTypes = {
  score: PropTypes.number,
};

Score.defaultProps = {
  score: 0,
};


export default Score;
