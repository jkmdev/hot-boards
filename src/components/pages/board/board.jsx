import React, { Component } from 'react';
import axios from 'axios';

import { string } from 'prop-types';
import ListItem from '../../common/list-item/list-item';
import BoardInfo from '../../common/board-info/board-info';

import styles from './board.css';

class Board extends Component {
  state = {
    data: Object,
    posts: [],
    title: string,
    description: string,
    open: false,
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    axios.get(`${process.env.REACT_APP_API}boards/General`)
      .then((response) => {
        this.setState({ posts: response.data.boardInfo.posts });
        this.setState({ title: response.data.boardInfo.title });
        this.setState({ boardInfo: response.data.boardInfo.description });
        console.log(this.state);
      })
      .catch((error) => {
        throw Error(error);
      });
  };

  createPosts() {
    const { posts } = this.state;
    return posts
      .sort((a, b) => a.score < b.score)
      .map(post => (
        <ListItem
          score={post.score}
          title={post.title}
          content={`${post.content.substring(0, 50)}...`}
          owner={post.owner.username}
          commentCount={post.comments.length}
        />
      ));
  }

  render() {
    const { title, boardInfo } = this.state;
    return (
      <div className={styles.board}>
        <div className={styles.boardInfo}>
          <BoardInfo title={title} boardInfo={boardInfo} />
        </div>
        <div className={styles.posts}>
          {this.createPosts()}
        </div>
      </div>
    );
  }
}

export default Board;
