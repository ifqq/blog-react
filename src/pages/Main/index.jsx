import React from 'react';

import styles from './Main.module.scss';

function Main() {
  return (
    <div className={styles.wrapper}>
      <h1>ChillOut</h1>
      <h2>Блог фронтенд-разработчика</h2>
      <img src='./img/imageBlog.png' alt='Img' />
      <h3>Обо мне</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
        scelerisque diam arcu risus. Imperdiet dolor, porttitor pellentesque
        fringilla aliquet sit. Turpis arcu vitae quis nunc suscipit. Mattis
        scelerisque leo curabitur faucibus. Nec, sed porta ac enim. Mattis quam
        accumsan ipsum commodo sed purus mi. Platea sit lectus neque, nulla
        sapien vitae nulla. Nisl viverra viverra quis mattis tincidunt laoreet
        amet, laoreet proin. Duis mi, aliquam tincidunt amet phasellus malesuada
        non nisi.
      </p>
    </div>
  );
}

export default Main;
