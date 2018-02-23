import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import Moment from 'react-moment';

class PostsList extends Component {
  static propTypes = {
    posts: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onVote: PropTypes.func.isRequired,
    back: PropTypes.string.isRequired
  };

  renderPosts() {
    const { posts, onDeleteClick, onVote, back } = this.props;
    return _.map(posts, post => {
      // console.log(post);
      if (!post.deleted && post.id !== undefined) {
        return (
          <li className="list-group-item" key={post.id}>
            <div className="ui items">
              <div className="item">
                <div className="content">
                  <Button basic floated='right' className="ui icon button red" onClick={event => onDeleteClick(post.id)}>
                    <i className="delete icon"></i>
                  </Button>
                  <Link to={`/posts/edit/${post.category}/${post.id}/${back}`}>
                    <Button basic floated='right' className="ui icon button primary"><i className="edit icon"></i></Button>
                  </Link>
                  <span className="header author"> {post.author} </span>
                  <Link className="header" to={`/posts/${post.id}`}>
                    <span className="header">
                      {post.title}
                    </span>
                  </Link>
                  <div className="description">
                    <p>{post.body}</p>
                    <p></p>
                  </div>
                  <div className="extra">
                    <Icon link name='dislike outline' className="red" onClick={event => onVote(post.id, 'downVote')} />
                      {post.voteScore} Votes &nbsp;
                    <Icon link name='like outline' className="green" onClick={event => onVote(post.id, 'upVote')} />
                    <span className="span-margin">{post.commNum} Comments</span>
                    <Moment fromNow>{post.timestamp}</Moment>
                  </div>
                </div>
              </div>
            </div>
            <div className="ui divider"></div>
          </li>
        );
      }
    });
  }

  render() {
    return <ul>{this.renderPosts()}</ul>;
  }
}

export default PostsList;
