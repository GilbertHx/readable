import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { fetchCategories } from './../actions/action_categories';
import * as actionPosts from './../actions/action_posts';
import { Container, Button, Grid } from 'semantic-ui-react';
import Categories from './categories';
import PostsList from './posts_list';

class PostsIndex extends Component {
  constructor(props) {
    super(props);
    this.flag = false;
  }

  componentDidMount() {
    this.flag = false;
    this.props.fetchCategories();
    this.props.fetchPosts();
  }

  deleteClick(postId) {
    this.props.deletePost(postId, () => {
      this.props.history.push('/');
    });
  }

  vote(postId, option) {
    this.props.vote(postId, option, () => {
    });
  }

  orderBy = attr => {
    this.props.orderBy(attr);
  };

  combCommentNum(posts) {
    const postKeys = _.keys(posts);
    _.forEach(postKeys, key => {
      this.props.fetchCommentsMa(key);
    });
  }

  render() {
    const { posts, categories } = this.props;

    if (!_.isEmpty(posts) && this.flag === false) {
      this.combCommentNum(posts);
      this.flag = true;
    }
    // if(!posts){
    //   return (<div>No posts</div>)
    // }

    return (
      <Container >
        <div className="ui grid">
          <div className="stretched twelve wide column">
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Link to="/posts/new/index">
                  <Button basic floated='left' size='large' className="ui icon button primary circular"><i className="plus icon"></i></Button>
                </Link>
              </Grid.Column>
              <Grid.Column floated='right' width={7}>
                <p className="App-intro floated right ">{' '}
                  <Button floated='right' color='brown' basic onClick={() => this.orderBy('timestamp')}>
                    Date
                  </Button>
                  <Button floated='right'color='brown' basic onClick={() => this.orderBy('voteScore')}>
                    Score
                  </Button>
                </p>
              </Grid.Column>
            </Grid>
            <div className="ui divider"></div>
            <PostsList
              posts={posts}
              onDeleteClick={this.deleteClick.bind(this)}
              onVote={this.vote.bind(this)}
              back="index"
            />
          </div>
          <div className="four wide column">
            <Categories categories={categories}/>
          </div>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = ({ categories, posts }) => {
  // console.log(posts);
  let sortedPosts = _.mapKeys(_.orderBy(posts,[!posts.sortingCriteria ? "voteScore" : posts.sortingCriteria] , ['desc']), 'id');
  // console.log(sortedPosts);
  return ({ categories, posts: sortedPosts });
}

export default connect(mapStateToProps, {
  fetchCategories,
  fetchPosts: actionPosts.fetchPosts,
  deletePost: actionPosts.deletePost,
  vote: actionPosts.vote,
  orderBy: actionPosts.orderBy,
  fetchCommentsMa: actionPosts.fetchCommentsMa
})(PostsIndex);
