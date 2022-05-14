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
  } catch (error) {
    console.log(error);
  }
};

const uploadPost = async (title, description, text, url) => {
  const data = url
    ? { title: title, description: description, text: text, photoUrl: url }
    : { title: title, description: description, text: text };
  await instance.post('posts', data);
};

export const updatePosts =
  (query = '', page = 1) =>
  async (dispatch) => {
    try {
      const { data } =
        query === ''
          ? await axios.get(
              `${process.env.REACT_APP_API}posts?limit=4&page=${page}&orderBy=desc`
            )
          : await axios.get(
              `${process.env.REACT_APP_API}posts?limit=4&page=${page}&query=${query}&orderBy=desc`
            );

      await dispatch({
        type: 'UPDATE_POSTS',
        payload: {
          total: data.total,
          currentPage: page,
          maxPage: data.total > 4 ? Math.ceil(data.total / 4) : 1,
          items: data.items,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const searchPosts =
  (page = 1) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}posts?limit=4&page=${page}&orderBy=desc`
      );

      await dispatch({
        type: 'UPDATE_POSTS',
        payload: {
          total: data.total,
          maxPage: data.total > 4 ? Math.ceil(data.total / 4) : 1,
          items: data.items,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const editArticle = (fields, id) => async (dispatch) => {
  try {
    if (fields.editFile) {
      const formData = new FormData();
      formData.append('file', fields.url);
      const { data } = await uploadInstance.post('/posts/upload', formData);
      await editPost(
        fields.title,
        fields.description,
        fields.text,
        data.url,
        id
      );
    } else {
      await editPost(
        fields.title,
        fields.description,
        fields.text,
        fields.textUrl,
        id
      );
    }
    dispatch(updatePosts());
    console.log('ok');
  } catch (error) {
    console.log(error);
  }
};

const editPost = async (title, description, text, url = '', id) => {
  await instance.patch(`/posts/${id}`, {
    title: title,
    description: description,
    photoUrl: url,
    text: text,
  });
};

export const deletePost = (id) => async (dispatch) => {
  await instance.delete(`/posts/${id}`);
  dispatch(updatePosts());
};
