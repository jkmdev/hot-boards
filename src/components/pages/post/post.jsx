import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';

class Post extends Component {
  handleClose = () => {
    const { onClose, selectedValue } = this.props;
    onClose(selectedValue);
  };

  handleListItemClick = (value) => {
    const { onClose } = this.props;
    onClose(value);
  };

  render() {
    const {
      classes, onClose, selectedValue, ...other
    } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        yikers
      </Dialog>
    );
  }
}

Post.propTypes = {
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
  classes: PropTypes.arrayOf,
};

Post.defaultProps = {
  onClose: () => {},
  selectedValue: '',
  classes: [],
};

export default Post;
