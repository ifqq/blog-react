import React from 'react';
import ContentLoader from 'react-content-loader';

import styles from './Article.module.scss';

function Article({
  title,
  description,
  photoUrl,
  createdAt,
  views,
  openFullPost,
  loading = false,
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
      {loading ? (
        <ContentLoader
          speed={2}
          width={620}
          height={240}
          viewBox='0 0 620 240'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'
        >
          <rect x='7' y='15' rx='3' ry='3' width='560' height='15' />
          <rect x='7' y='40' rx='3' ry='3' width='300' height='15' />
          <rect x='439' y='52' rx='15' ry='15' width='135' height='135' />
          <rect x='7' y='85' rx='3' ry='3' width='350' height='10' />
          <rect x='7' y='105' rx='3' ry='3' width='350' height='10' />
          <rect x='7' y='125' rx='3' ry='3' width='350' height='10' />
          <rect x='7' y='145' rx='3' ry='3' width='150' height='10' />
          <rect x='7' y='180' rx='3' ry='3' width='200' height='15' />
          <circle cx='287' cy='187' r='13' />
          <rect x='318' y='180' rx='3' ry='3' width='25' height='15' />
        </ContentLoader>
      ) : (
        <>
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
                src={`${process.env.REACT_APP_API}${photoUrl}`}
                alt='Img'
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Article;
