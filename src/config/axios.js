import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: window.localStorage.getItem('token'),
  },
});

export const uploadInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    Authorization: window.localStorage.getItem('token'),
    'Content-Type': 'multipart/form-data',
  },
});
