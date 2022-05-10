import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Icons.module.scss';

function Icons({ onClickSearch, navToHome, onClickLogin, onClickWrite }) {
  const { auth } = useSelector((state) => state.profile);
  return (
    <>
      <h2 className={styles.h2} onClick={navToHome}>
        VASYA BLOG
      </h2>
      <div className={styles.icons}>
        <div className={styles.tooltip}>
          <img onClick={onClickSearch} src='./svg/search.svg' alt='Search' />
          <span className={styles.tooltiptext}>Поиск</span>
        </div>
        {auth && (
          <div className={styles.tooltip}>
            <img onClick={onClickWrite} src='./svg/write.svg' alt='Write' />
            <span className={styles.tooltiptext}>Написать</span>
          </div>
        )}
        <div className={styles.tooltip}>
          <img onClick={onClickLogin} src='./svg/login.svg' alt='Login' />
          <span className={styles.tooltiptext}>Профиль</span>
        </div>
      </div>
    </>
  );
}

export default Icons;
