import React from 'react';

import styles from './Article.module.scss';

function Article({ title, text, image, date, viewing }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.article}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className={styles.articleFooter}>
          {date}
          <img src='./svg/eye.svg' alt='Eye' />
          {viewing}
        </div>
      </div>
      <img className={styles.img} src={image} alt='Img' />
    </div>
  );
}

export default Article;
