const initialState = [];

export function articlesReducer(state = initialState, action) {
  if (action.type === 'UPDATE_POSTS') {
    return action.payload;
  }
  return state;
}
