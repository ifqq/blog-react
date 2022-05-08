import { instance } from '../../config/axios';

export const authMe = () => async (dispatch) => {
  try {
    const { data } = await instance.get('/auth/me');
    await dispatch(loginUser(data.fullName, data.createdAt));
    console.log('on');
  } catch {
    await dispatch(clearUserInfo());
    console.log('off');
  }
};

const clearUserInfo = () => ({
  type: 'CLEAR_USER_INFO',
});

const loginUser = (fullName, createdAt) => ({
  type: 'LOGIN_USER',
  payload: { fullName, createdAt },
});
