import axios from 'axios';
import { instance } from '../../config/axios';

export const updateComments = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5656/comments/post/${id}`
    );
    dispatch({
      type: 'UPDATE_COMMENTS',
      payload: data.reverse(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const createComment = (text, id) => async (dispatch) => {
  try {
    await instance.post('http://localhost:5656/comments', {
      text: text,
      postId: id,
    });
    await dispatch(updateComments(id));
  } catch (error) {
    console.log(error);
  }
};
