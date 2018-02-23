import axios from 'axios';

import * as TYPE from './type';
import { api, headers } from './../config/api_setting';

export function editComment(values, commentId, callback) {
  const request = axios({
    method: 'put',
    url: `${api}/comments/${commentId}`,
    data: values,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());
  return {
    type: TYPE.EDIT_COMMENT,
    payload: request
  };
}

export function fetchComments(id) {
  const request = axios({
    method: 'get',
    url: `${api}/posts/${id}/comments`,
    headers: {
      ...headers
    }
  });
  return {
    type: TYPE.FETCH_COMMENTS,
    payload: request
  };
}

export function commentVote(id, option, callback) {
  axios({
    method: 'post',
    url: `${api}/comments/${id}`,
    data: { option: option },
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());

  return {
    type: TYPE.COMMENT_VOTE,
    payload: id,
    option: option
  };
}

export function deleteComment(id, callback) {
  axios({
    method: 'delete',
    url: `${api}/comments/${id}`,
    headers: {
      ...headers
    }
  }).then(() => callback());

  return {
    type: TYPE.DELETE_COMMENT,
    payload: id
  };
}

export function addComment(values, callback) {
  const request = fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  }).then(res => res.json());
  return {
    type: TYPE.ADD_COMMENT,
    payload: request
  };
}

export function commOrderBy(attr) {
  return {
    type: TYPE.COMM_ORDER_BY,
    payload: attr
  };
}
