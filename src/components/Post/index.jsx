import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './Post.module.scss';

function Post() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    state.articles.find((obj) => obj.id === Number(id - 1))
  );
  console.log(post);
  return (
    <>
      <div className={styles.img}>
        <img src='./img/test.png' alt='img' />
      </div>
      <div className={styles.header}>
        <span>
          {post.date}
          <img src='./svg/eye.svg' alt='Eye' />
          {post.viewing}
        </span>
        <h2>{post.title}</h2>
        <p>{post.text}</p>
      </div>
    </>
  );
}

export default Post;
