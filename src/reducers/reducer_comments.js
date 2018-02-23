import _ from 'lodash';

import {
  FETCH_COMMENTS,
  COMMENT_VOTE,
  DELETE_COMMENT,
  ADD_COMMENT,
  COMM_ORDER_BY
} from './../actions/type';

const initialPostState = {
  sortingCommCriteria: 'voteScore'
}

export default function(state = initialPostState, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      _.forEach(action.payload.data, function(obj) {
        obj['commNum'] = 0;
      });

      return _.mapKeys(
        _.orderBy(action.payload.data, ['voteScore'], ['desc']),
        'id'
      );
    case DELETE_COMMENT:
      return _.omit(state, action.payload);

    case COMMENT_VOTE:
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
    case ADD_COMMENT:
      if (action.payload) {
        return { ...state, [action.payload.id]: action.payload };
      } else {
        return state;
      }
    case COMM_ORDER_BY:
      return {...state,
        sortingCommCriteria: action.payload
      }
    default:
      return state;
  }
}
