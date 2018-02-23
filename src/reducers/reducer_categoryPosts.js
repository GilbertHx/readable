import _ from 'lodash';

import {
  FETCH_CATEGORY_POSTS,
  DELETE_POST,
  CATE_VOTE,
  CATE_ORDER_BY,
  FETCH_CATE_COMMENTS_MA
} from './../actions/type';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORY_POSTS:
      _.forEach(action.payload.data, function(obj) {
        obj['commNum'] = 0;
      });
      return _.mapKeys(
        _.orderBy(action.payload.data, ['voteScore'], ['desc']),
        'id'
      );
    case DELETE_POST:
      return _.omit(state, action.payload);
    case CATE_VOTE:
      const newState = { ...state };
      if (action.option === 'upVote') {
        newState[action.payload]['voteScore'] = ++newState[action.payload][
          'voteScore'
        ];
      } else if (action.option === 'downVote') {
        newState[action.payload]['voteScore'] = --newState[action.payload][
          'voteScore'
        ];
      }

      return newState;
    case CATE_ORDER_BY:
      return {...state,
        sortingCriteria: action.payload
      }
    case FETCH_CATE_COMMENTS_MA:
      if (!_.isEmpty(action.payload)) {
        const postId = action.payload[0]['parentId'];
        const newState3 = { ...state };
        if(newState3[postId]) {
        newState3[postId]['commNum'] = action.payload.length;
        }
        return newState3;
      }

      return state;
    default:
      return state;
  }
}
