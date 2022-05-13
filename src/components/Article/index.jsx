import React from 'react';

import styles from './Article.module.scss';

function Article({
  title,
  description,
  photoUrl,
  createdAt,
  views,
  openFullPost,
}) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const newCreatedAt = new Date(createdAt);
  return (
    <div className={styles.wrapper}>
      <div className={styles.article}>
        <h3 onClick={openFullPost}>{title}</h3>
        <p>{description}</p>
        <div className={styles.articleFooter}>
          {newCreatedAt.toLocaleDateString('ru-RU', options)}
          <img src='./svg/eye.svg' alt='Eye' />
          {views}
        </div>
      </div>
      {photoUrl && (
        <div className={styles.box}>
          <img
            className={styles.img}
            src={`http://localhost:5656/${photoUrl}`}
            alt='Img'
          />
        </div>
      )}
    </div>
  );
}

export default Article;
