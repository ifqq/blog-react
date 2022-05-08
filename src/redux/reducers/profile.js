const initialState = { auth: false, fullName: '', createdId: '' };

export function profileReducer(state = initialState, action) {
  if (action.type === 'LOGIN_USER') {
    return {
      auth: true,
      fullName: action.payload.fullName,
      createdAt: action.payload.createdAt,
    };
  }
  if (action.type === 'CLEAR_USER_INFO') {
    return {
      auth: false,
      fullName: '',
      createdAt: '',
    };
  }
  return state;
}
