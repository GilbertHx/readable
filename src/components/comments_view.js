import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import Moment from 'react-moment';

class CommentsView extends Component {
  static propTypes = {
    comments: PropTypes.object.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    onVote: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  };

  renderComment() {
    const { comments, onDeleteClick, onVote, postId, category } = this.props;
    // console.log(_.filter(comments, undefined));
    return _.map(comments, comment => {
      if (!comment.deleted && comment.id !== undefined) {
        return (
          <li className="list-group-item" key={comment.id}>
            <div className="ui comments">
              <div className="comment">
                <div className="content">
                  <a className="author">{comment.author}</a>
                  <div className="metadata">
                    <Moment fromNow>{comment.timestamp}</Moment>
                    <Link to={`/comment/edit/${category}/${postId}/${comment.id}`}>
                      <Icon link name='edit' className="blue" />
                    </Link>
                    <Icon link name='close' className="red" onClick={event => onDeleteClick(comment.id)} />
                  </div>
                  <div className="text">
                      {comment.body}
                  </div>
                  <div className="actions">
                    <a>
                      <Icon link name='dislike outline' className="red" onClick={event => onVote(comment.id, 'downVote')} />
                        {comment.voteScore} Votes &nbsp;
                      <Icon link name='like outline' className="green" onClick={event => onVote(comment.id, 'upVote')} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      }
    });
  }

  render() {
    return <ul>{this.renderComment()}</ul>;
  }
}

export default CommentsView;
