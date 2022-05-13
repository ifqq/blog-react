import axios from 'axios';
import { instance, uploadInstance } from '../../config/axios';

export const uploadArticle = (fields) => async (dispatch) => {
  try {
    if (fields.url) {
      const formData = new FormData();
      formData.append('file', fields.url);
      const { data } = await uploadInstance.post('/posts/upload', formData);
      await uploadPost(fields.title, fields.description, fields.text, data.url);
    } else {
      await uploadPost(fields.title, fields.description, fields.text);
    }
    dispatch(updatePosts());
    console.log('ok');
  } catch (error) {
    console.log(error);
  }
};

const uploadPost = async (title, description, text, url = '') => {
  await instance.post('http://localhost:5656/posts', {
    title: title,
    description: description,
    photoUrl: url,
    text: text,
  });
};

export const updatePosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      'http://localhost:5656/posts?orderBy=desc'
    );
    dispatch({
      type: 'UPDATE_POSTS',
      payload: data.items,
    });
  } catch (error) {
    console.log(error);
  }
};
