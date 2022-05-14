import { createStore, combineReducers, applyMiddleware } from 'redux';
import { articlesReducer } from './reducers/articles';
import { searchReducer } from './reducers/search';
import { profileReducer } from './reducers/profile';
import { commentsReducer } from './reducers/comments';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  articles: articlesReducer,
  searchValue: searchReducer,
  profile: profileReducer,
  comments: commentsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
