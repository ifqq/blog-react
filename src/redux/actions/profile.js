import axios from 'axios';
import { instance } from '../../config/axios';

export const authMe = () => async (dispatch) => {
  try {
    const { data } = await instance.get('/auth/me');
    await dispatch(loginUser(data._id, data.fullName, data.createdAt));
    console.log('on');
  } catch {
    await dispatch(clearUserInfo());
    console.log('off');
  }
};

const clearUserInfo = () => ({
  type: 'CLEAR_USER_INFO',
});

const loginUser = (id, fullName, createdAt) => ({
  type: 'LOGIN_USER',
  payload: { id, fullName, createdAt },
});

export const getUserPosts = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:5656/posts?${id}`);
    dispatch({
      type: 'GET_USER_POSTS',
      payload: data.items,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserComments = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:5656/comments?${id}`);
  } catch (error) {
    console.log(error);
  }
};
