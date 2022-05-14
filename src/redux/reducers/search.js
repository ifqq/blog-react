const initialState = '';

export function searchReducer(state = initialState, action) {
  if (action.type === 'SET_SEARCH_VALUE') {
    return action.payload;
  }
  if (action.type === 'CLEAR_SEARCH_VALUE') {
    return '';
  }
  return state;
}
