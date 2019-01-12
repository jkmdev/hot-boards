import React, { Component } from "react";
import ListItem from '../../common/list-item/list-item.js';

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
      <div>
        <ListItem />
        <p>Hello, world!</p>
      </div>
    );
  }
}

export default Board; 