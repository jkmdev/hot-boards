import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import Upload from '../../pages/upload/upload';

import styles from './board-info.css';

const BoardInfo = ({ title }) => (
  <Paper className={styles.info} elevation={1}>
    <Upload boardName={title} />
  </Paper>
);

BoardInfo.propTypes = {
  title: PropTypes.string,
};

BoardInfo.defaultProps = {
  title: 'No Title Defined',
};


export default BoardInfo;
