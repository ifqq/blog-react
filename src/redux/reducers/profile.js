const initialState = {
  auth: false,
  id: '',
  fullName: '',
  createdId: '',
  userPosts: { total: 1, currentPage: 1, maxPage: 1, items: [{}] },
  userComments: { total: 1, currentPage: 1, maxPage: 1, items: [{}] },
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
        userPosts: { total: 1, currentPage: 1, maxPage: 1, items: [{}] },
        userComments: { total: 1, currentPage: 1, maxPage: 1, items: [{}] },
      };

    case 'GET_USER_POSTS':
      return {
        ...state,
        userPosts: action.payload,
      };

    case 'GET_USER_COMMENTS':
      return {
        ...state,
        userComments: action.payload,
      };

    default:
      return state;
  }
}
