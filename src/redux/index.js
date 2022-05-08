import { createStore, combineReducers, applyMiddleware } from 'redux';
import { articlesReducer } from './reducers/articles';
import { searchReducer } from './reducers/search';
import { profileReducer } from './reducers/profile';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  articles: articlesReducer,
  searchValue: searchReducer,
  profile: profileReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
