import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './Post.module.scss';

function Post() {
  let { id } = useParams();
  const post = useSelector((state) =>
    state.articles.find((obj) => obj._id === id)
  );
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const createdAt = new Date(post.createdAt);
  return (
    <>
      <div className={styles.img}>
        {post.photoUrl && (
          <img src={`http://localhost:5656/${post.photoUrl}`} alt='img' />
        )}
      </div>
      <div className={styles.header}>
        <span>
          {createdAt.toLocaleDateString('ru-RU', options)}
          <img src='./svg/eye.svg' alt='Eye' />
          {post.views}
        </span>
        <h2>{post.title}</h2>
        <p>{post.description}</p>
      </div>
    </>
  );
}

export default Post;
