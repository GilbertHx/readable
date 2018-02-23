import axios from 'axios';

import * as TYPE from './type';
import { api, headers } from './../config/api_setting';

export function fetchPosts() {
  const request = axios({
    method: 'get',
    url: `${api}/posts`,
    headers: {
      ...headers
    }
  });
  return {
    type: TYPE.FETCH_POSTS,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios({
    method: 'get',
    url: `${api}/posts/${id}`,
    headers: {
      ...headers
    }
  });

  return {
    type: TYPE.FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  axios({
    method: 'delete',
    url: `${api}/posts/${id}`,
    headers: {
      ...headers
    }
  }).then(() => callback());

  return {
    type: TYPE.DELETE_POST,
    payload: id
  };
}

export function vote(id, option, callback) {
  axios({
    method: 'post',
    url: `${api}/posts/${id}`,
    data: { option: option },
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());

  return {
    type: TYPE.VOTE,
    payload: id,
    option: option
  };
}

export function orderBy(attr) {
  return {
    type: TYPE.ORDER_BY,
    payload: attr
  };
}

export function fetchCommentsMa(id) {
  const request = fetch(`${api}/posts/${id}/comments`, {
    headers
  }).then(res => {
    return res.json();
  });
  // console.log(id);
  return {
    type: TYPE.FETCH_COMMENTS_MA,
    payload: request
  };
}

export function createPost(values, callback) {
  const request = axios({
    method: 'post',
    url: `${api}/posts`,
    data: values,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());

  return {
    type: TYPE.CREATE_POST,
    payload: request
  };
}

export function editPost(values, postId, callback) {
  const request = axios({
    method: 'put',
    url: `${api}/posts/${postId}`,
    data: values,
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(() => callback());
  return {
    type: TYPE.EDIT_POST,
    payload: request
  };
}
