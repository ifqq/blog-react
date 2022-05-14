const initialState = [];

export function commentsReducer(state = initialState, action) {
  if (action.type === 'UPDATE_COMMENTS') {
    return action.payload;
  }
  return state;
}
