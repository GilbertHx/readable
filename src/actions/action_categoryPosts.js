import axios from 'axios';

import * as TYPE from './type';
import { api, headers } from './../config/api_setting';

export function fetchCategoryPosts(category) {
  const request = axios({
    method: 'get',
    url: `${api}/${category}/posts`,
    headers: {
      ...headers
    }
  });

  return {
    type: TYPE.FETCH_CATEGORY_POSTS,
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

export function cateVote(id, option, callback) {
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
    type: TYPE.CATE_VOTE,
    payload: id,
    option: option
  };
}

export function cateOrderBy(attr) {
  return {
    type: TYPE.CATE_ORDER_BY,
    payload: attr
  };
}

export function fetchCateCommentsMa(id) {
  const request = fetch(`${api}/posts/${id}/comments`, {
    headers
  }).then(res => {
    return res.json();
  });

  return {
    type: TYPE.FETCH_CATE_COMMENTS_MA,
    payload: request
  };
}
