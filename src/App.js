import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';

import PageNotFound from './components/page_not_found';
import PostsIndex from './components/posts_index';
import PostsCategory from './components/posts_category';
import PostDetail from './components/post_detail';
import PostsNew from './components/posts_new';
import PostEdit from './components/post_edit';
import CommentEdit from './components/comment_edit';

class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <Link to="/" >
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Readable</h1>
            </header>
          </Link>
        </div>
        <Switch>
          <Route
            exact
            path="/comment/edit/:category/:post_id/:comment_id"
            component={CommentEdit}
          />
          <Route
            exact
            path="/posts/edit/:category/:post_id/:back"
            component={PostEdit}
          />
          <Route path="/posts/new/:back" component={PostsNew} />
          <Route path="/:category/:post_id" component={PostDetail} />
          <Route path="/:category" component={PostsCategory} />
          <Route path="/" component={PostsIndex} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
