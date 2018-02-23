import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import serializeForm from 'form-serialize';
import _ from 'lodash';

import { _uuid } from '../utils/helpers';
import * as actionComments from './../actions/action_comments';
import * as actionPosts from './../actions/action_posts';
import { Container, Button, Icon, Label, Form } from 'semantic-ui-react';
import Moment from 'react-moment';
import CommentsView from './comments_view';
import PageNotFound from './page_not_found';

class PostDetail extends Component {
  componentWillMount() {
    const { post_id } = this.props.match.params;
    this.props.fetchPost(post_id);
    this.props.fetchComments(post_id);
  }

  onDeleteClick() {
    const { post_id } = this.props.match.params;
    this.props.deletePost(post_id, () => {
      this.props.history.push('/');
    });
  }

  onVote(postId, option) {
    this.props.vote(postId, option, () => {
    });
  }

  deleteCommentClick(commentId) {
    this.props.deleteComment(commentId, () => {
    });
  }

  voteComment(commentId, option) {
    this.props.commentVote(commentId, option, () => {
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { post_id } = this.props.match.params;
    const values = serializeForm(event.target, { hash: true });
    values['parentId'] = post_id;
    values['id'] = _uuid();
    values['timestamp'] = Date.now();

    this.bodyInput.value = '';
    this.authorInput.value = '';
    this.props.addComment(values, () => {});
  };

  orderBy = attr => {
    this.props.commOrderBy(attr);
  };

  render() {
    const { post, comments } = this.props;
    const { post_id, category } = this.props.match.params;

    if(!post || post === undefined){
      return <PageNotFound />
    }

    return (
      <Container>
        <Button floated='right' basic className="ui icon button red" onClick={this.onDeleteClick.bind(this)}>
          <i className="delete icon"></i>
        </Button>
        <Link to={`/posts/edit/${post.category}/${post.id}/detail`}>
          <Button basic floated='right' className="ui icon button primary"><i className="edit icon"></i></Button>
        </Link>
        <h4 className="ui header">
          <span className="header author">
            {post.author}
          </span>
            {post.title}
          <Label className="ui basic label">{post.category}</Label>
            &nbsp;
          <Moment fromNow>{post.timestamp}</Moment>
        </h4>
        <p>{post.body}</p>
        <div className="metadata">
          <Icon link name='dislike outline' className="red" onClick={event => this.onVote(post.id, 'downVote')} />
            {post.voteScore} Votes &nbsp;
          <Icon link name='like outline' className="green" onClick={event => this.onVote(post.id, 'upVote')} />
          <h4 className="span-margin">Comments</h4>
        </div>
        <div className="ui divider"></div>
        <br />
        <p className="App-intro floated right ">{' '}
          <Button color='brown'size="mini" basic onClick={() => this.orderBy('timestamp')}>
            Date
          </Button>
          <Button color='brown' size="mini" basic onClick={() => this.orderBy('voteScore')}>
            Score
          </Button>
        </p>
        <CommentsView
          comments={comments}
          onDeleteClick={this.deleteCommentClick.bind(this)}
          onVote={this.voteComment.bind(this)}
          category={category}
          postId={post_id}
        />

        <Form onSubmit={this.handleSubmit} className="form-inline">
          <div className="form-group">
            <label htmlFor="body">Comment:</label>
            <input
              required
              type="text"
              className="form-control a-margin"
              name="body"
              id="body"
              ref={input => {
                this.bodyInput = input;
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author" className="a-margin">
              Author:
            </label>
            <input required
              type="text"
              className="form-control a-margin"
              name="author"
              id="author"
              ref={input => {
                this.authorInput = input;
              }}
            />
          </div>
          <Button basic type="submit" className="primary">Comment</Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({ posts, comments, categories }, ownProps) => {
  let sortedComments = _.mapKeys(_.orderBy(comments,[comments.sortingCommCriteria] , ['desc']), 'id');
  return {
    post: posts[ownProps.match.params.post_id],
    posts,
    comments: sortedComments,
    categories
  };
}

export default connect(mapStateToProps, {
  fetchPost : actionPosts.fetchPost,
  deletePost: actionPosts.deletePost,
  vote: actionPosts.vote,
  fetchComments: actionComments.fetchComments,
  commentVote: actionComments.commentVote,
  deleteComment: actionComments.deleteComment,
  addComment: actionComments.addComment,
  commOrderBy: actionComments.commOrderBy
})(PostDetail);
