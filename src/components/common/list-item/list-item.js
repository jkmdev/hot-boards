import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { CardContent } from "@material-ui/core";
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import styles from './list-item.css';

class ListItem extends Component {
  render() {
    return (
      <div className={styles.post}>
        <Card>
          <CardContent>
            <Grid container spacing={24}>
              <Grid item xs={10}>
                <Typography variant="h6">
                  Animated Input Label with Chrome Autofill Detection in React
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" size="small" color="primary">
                  View More
                </Button>
              </Grid>
            </Grid>
            <Typography variant="caption">
              Posted by @anon
            </Typography>
            <Typography variant="caption">
              16 Comments
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default ListItem; 