import axios from 'axios';
import { instance } from '../../config/axios';

export const authMe = () => async (dispatch) => {
  try {
    const { data } = await instance.get('/auth/me');
    await dispatch(loginUser(data._id, data.fullName, data.createdAt));
  } catch {
    await dispatch(clearUserInfo());
  }
};

const clearUserInfo = () => ({
  type: 'CLEAR_USER_INFO',
});

const loginUser = (id, fullName, createdAt) => ({
  type: 'LOGIN_USER',
  payload: { id, fullName, createdAt },
});

// export const getUserPosts = (id) => async (dispatch) => {
//   try {
//     const { data } = await axios.get(`http://localhost:5656/posts?${id}`);
//     console.log(data);
//     dispatch({
//       type: 'GET_USER_POSTS',
//       payload: data.items,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
export const getUserPosts =
  (query = '', page = 1, id) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5656/posts?userId=${id}&&limit=2&&page=${page}&&orderBy=desc`
      );

      await dispatch({
        type: 'GET_USER_POSTS',
        payload: {
          total: data.total,
          currentPage: page,
          maxPage: data.total > 4 ? Math.ceil(data.total / 2) : 1,
          items: data.items,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getUserComments =
  (query = '', page = 1, id) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5656/comments?userId=${id}&&limit=2&&page=${page}&&orderBy=desc`
      );
      await dispatch({
        type: 'GET_USER_COMMENTS',
        payload: {
          total: data.total,
          currentPage: page,
          maxPage: data.total > 4 ? Math.ceil(data.total / 2) : 1,
          items: data.items,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
