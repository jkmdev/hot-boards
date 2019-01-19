import React, { Component } from "react";
import axios from 'axios';

import ListItem from '../../common/list-item/list-item.js';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import styles from './board.css';

class Board extends Component {

  state = {
    data: Object,
    posts: []
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    axios.get('http://localhost:3001/boards/General')
    .then(response => {
      this.setState({ posts: response.data.boardInfo.posts });
      console.log(this.state.posts);
      // this.state.posts.map((post) => console.log(post));
    })
    .catch(function (error) {
      throw Error(error);
    })
  };

  createPosts(){
    return this.state.posts.map((post, i) => {
      return <ListItem 
        key={i} 
        title={post.title} 
        content={post.content}
        owner={post.owner.username}
        commentCount={post.comments.length}
      />
      // return <div key={post._id}>{post.title}</div>
    });
  }
  
  render() {
    const { posts } = this.state.posts;
    return (
      <div className={styles.board}>

        <div className={styles.posts}>

        {/* {data.title} */}

        {/* <ul>
          {posts.length <= 0
            ? "NO POSTS YET"
            : posts.map(post => (
                <li style={{ padding: "10px" }} key={post._id}>
                  {post.title}
                </li>
              ))}
        </ul>  */}

        <div>
          {this.createPosts()}
        </div>

          
        </div>

      </div>
    );
  }
}

export default Board; 

        {/* // <ul>
        //   {data.length <= 0
        //     ? "NO DB ENTRIES YET"
        //     : data.map(dat => (
        //         <li style={{ padding: "10px" }} key={data.message}>
        //           <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
        //           <span style={{ color: "gray" }}> data: </span>
        //           {dat.message}
        //         </li>
        //       ))}
        // </ul> */}