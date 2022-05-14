const initialState = {
  auth: false,
  id: '',
  fullName: '',
  createdId: '',
  userPosts: [{}],
  userComments: [{}],
};

export function profileReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        auth: true,
        id: action.payload.id,
        fullName: action.payload.fullName,
        createdAt: action.payload.createdAt,
      };

    case 'CLEAR_USER_INFO':
      return {
        auth: false,
        id: '',
        fullName: '',
        createdAt: '',
        userPosts: [{}],
        userComments: [{}],
      };

    case 'GET_USER_POSTS':
      return {
        ...state,
        userPosts: action.payload,
      };

    default:
      return state;
  }
}
