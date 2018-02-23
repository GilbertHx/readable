import { combineReducers } from 'redux';
import { reducer as FormReducer } from 'redux-form';

import CategoriesReducer from './reducer_categories';
import PostsReducer from './reducer_posts';
import CategoryPostsReducer from './reducer_categoryPosts';
import CommentsReducer from './reducer_comments';

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  posts: PostsReducer,
  categoryPosts: CategoryPostsReducer,
  comments: CommentsReducer,
  form: FormReducer
});

export default rootReducer;
