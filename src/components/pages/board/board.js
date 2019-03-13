import React, { Component } from "react";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';

import ListItem from '../../common/list-item/list-item.js';
import BoardInfo from '../../common/board-info/board-info.js';

import styles from './board.css';
import { string } from "prop-types";

class Board extends Component {

  state = {
    data: Object,
    posts: [],
    title: string,
    description: string,
    open: false
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    axios.get('http://localhost:3001/boards/General')
    .then(response => {
      this.setState({ posts: response.data.boardInfo.posts });
      this.setState({ title: response.data.boardInfo.title });
      this.setState({ boardInfo: response.data.boardInfo.description });
      console.log(this.state);
    })
    .catch(function (error) {
      throw Error(error);
    })
  };

  createPosts(){
    return this.state.posts
      .sort((a, b) => a.score < b.score)
      .map((post, i) => {
        return <ListItem 
            key={i} 
            score={post.score}
            title={post.title} 
            content={post.content.substring(0, 50) + "..."}
            owner={post.owner.username}
            commentCount={post.comments.length}
          />
      });
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  
  render() {
    const { posts } = this.state.posts;
    return (
      <div className={styles.board}>
        <div className={styles.boardInfo}>
         <BoardInfo title={this.state.title} boardInfo={this.state.boardInfo}></BoardInfo>
        </div>
        <div className={styles.posts} onClick={this.handleClickOpen}>
            {this.createPosts()}
        </div>
      </div>
    );
  }
}

export default Board; 
