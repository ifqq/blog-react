import { updatePosts } from './articles';

export const setSearchValue = (text) => async (dispatch) => {
  dispatch({
    type: 'SET_SEARCH_VALUE',
    payload: text,
  });
  dispatch(updatePosts(text));
};

export const clearSearchValue = () => async (dispatch) => {
  dispatch({
    type: 'CLEAR_SEARCH_VALUE',
  });
  dispatch(updatePosts());
};
