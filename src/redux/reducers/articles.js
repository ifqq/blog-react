const initialState = {
  total: '',
  items: [
    {
      _id: '',
      title: '',
      description: '',
      text: '',
      photoUrl: '',
      createdAt: '',
      views: '',
    },
  ],
};

export function articlesReducer(state = initialState, action) {
  if (action.type === 'UPDATE_POSTS') {
    return action.payload;
  }
  return state;
}
