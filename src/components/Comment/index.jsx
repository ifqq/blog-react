import React from 'react';

import styles from './Comment.module.scss';

function Comment({ fullName, createdAt, text }) {
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
      <div className={styles.comment}>
        <h4>{fullName}</h4>
        <span>{newCreatedAt.toLocaleDateString('ru-RU', options)}</span>
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Comment;
