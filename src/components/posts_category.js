import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import * as actionCategoryPosts from './../actions/action_categoryPosts';
import { fetchCategories } from './../actions/action_categories';
import { Container, Button, Grid } from 'semantic-ui-react';
import Categories from './categories';
import PostsList from './posts_list';

class PostsCategory extends Component {
  constructor(props) {
    super(props);
    this.flag = false;
    this.curCategory = null;
    this.preCategory = null;
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    this.props.fetchCategoryPosts(category);
    this.props.fetchCategories();
    this.flag = false;
    this.curCategory = category;
  }

  componentWillReceiveProps(nextProps) {
    const { category } = this.props.match.params;
    const nextCategory = nextProps.match.params.category;

    if (nextCategory !== category) {
      this.props.fetchCategoryPosts(nextCategory);
      this.flag = false;
      this.curCategory = category;
    }
  }

  deleteClick(postId) {
    const { category } = this.props.match.params;
    this.props.deletePost(postId, () => {
      this.props.history.push(`/${category}`);
    });
  }

  vote(postId, option) {
    this.props.cateVote(postId, option, () => {
    });
  }

  orderBy = attr => {
    this.props.cateOrderBy(attr);
  };

  combCommentNum(posts) {
    const postKeys = _.keys(posts);
    _.forEach(postKeys, key => {
      this.props.fetchCateCommentsMa(key);
    });
  }

  render() {
    const { category } = this.props.match.params;
    const { categoryPosts, categories } = this.props;
    const backURL = `/posts/new/${category}`;

    if (!_.isEmpty(categoryPosts) && this.flag === false) {
      if (this.preCategory !== this.curCategory) {
        this.combCommentNum(categoryPosts);
        this.flag = true;
        this.preCategory = category;
      }
    }

    return (
      <Container >
        <div className="ui grid">
          <div className="stretched twelve wide column">
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Link to={backURL}>
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
              posts={categoryPosts}
              onDeleteClick={this.deleteClick.bind(this)}
              onVote={this.vote.bind(this)}
              back={'cate'}
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

const mapStateToProps = ({ categoryPosts, categories }) => {
  let sortedcategoryPosts = _.mapKeys(_.orderBy(categoryPosts,[!categoryPosts.sortingCriteria ? "voteScore" : categoryPosts.sortingCriteria] , ['desc']), 'id');
  return ({ categoryPosts: sortedcategoryPosts, categories });
}

export default connect(mapStateToProps, {
  fetchCategories,
  fetchCategoryPosts: actionCategoryPosts.fetchCategoryPosts,
  deletePost: actionCategoryPosts.deletePost,
  cateVote: actionCategoryPosts.cateVote,
  cateOrderBy: actionCategoryPosts.cateOrderBy,
  fetchCateCommentsMa: actionCategoryPosts.fetchCateCommentsMa
})(PostsCategory);
