import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

const url = 'https://practiceapi.devmountain.com/api/posts';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(url)
    .then(res => {this.setState({posts: res.data})});

  }

  updatePost(id, text) {
    axios.put(`${url}?id=${id}`, {text})
    .then(res => {this.setState({posts: res.data})});
  
  }

  deletePost(id) {
    axios.delete(`${url}?id=${id}`)
    .then(res => {this.setState({posts: res.data})});

  }

  createPost(text) {
    axios.post(`${url}`, {text})
    .then(res => {this.setState({posts: res.data})});


  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {
            posts.map(post => ( 
            <Post key={post.id}
                  id={post.id}
                  text={post.text}
                  date={post.date} 
                  updatePostFn={this.updatePost}
                  deletePostFn={this.deletePost}
                  

              /> ))}
        </section>
      </div>
    );
  }
}

export default App;
