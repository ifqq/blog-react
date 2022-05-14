import React from 'react';

import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <h2>404</h2>
      <p>Страница не найдена!</p>
    </div>
  );
};
