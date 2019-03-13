import React, { Component } from "react";
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    width: `1000px`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    borderRadius: 3
  },
});

class Upload extends Component {

  state = {
    open: true,
    title: '',
    content: ''
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitPost = () => {
    axios.post(`${process.env.REACT_APP_API}boards/General/submit`, {
      title: this.state.title,
      content: this.state.content
    })
    .then(response => {
      this.setState({ open: false });
    })
    .catch(function (error) {
      throw Error(error);
    })
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        
      <Button onClick={this.handleOpen}>
        UPLOAD
      </Button>

        <Modal
          aria-labelledby="upload-modal"
          aria-describedby="upload-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          >
            <div style={getModalStyle()} className={classes.paper}>

              <Typography variant="h6" align="center">
                Upload                
              </Typography>
              
              <TextField
                id="post-title"
                label="Post Title"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange('title')}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                helperText="Enter the title for your post."
              />

              <TextField
                id="post-content"
                label="Text Content"
                className={classes.textField}
                value={this.state.content}
                onChange={this.handleChange('content')}
                margin="normal"
                variant="outlined"
                multiline
                rows="20"
                required
                fullWidth
                helperText="Enter the text content for your post."
              />

              <Button onClick={this.submitPost} variant="outlined" color="primary" fullWidth>
                Submit
              </Button>

            </div>
            
        </Modal>
      </div>
    );
  }

}

Upload.propTypes = {
  classes: PropTypes.object.isRequired,
};

const UploadWrapped = withStyles(styles)(Upload);


export default UploadWrapped; 