import React, { Component } from "react";
import ListItem from '../../common/list-item/list-item.js';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import styles from './board.css';

class Board extends Component {

  state = {
    data: []
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    fetch("/boards/General")
      .then(data => {
        console.log(data.json())
      })
      .then(res => this.setState({ data: res.data }));
  };
  
  render() {
    return (
      <div className={styles.board}>

        <div className={styles.posts}>
          <ListItem />
          <ListItem />
        </div>

      </div>
    );
  }
}

export default Board; 