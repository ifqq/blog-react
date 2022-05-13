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
        <div onClick={onClickSearch} className={styles.tooltip}>
          <img src='./svg/search.svg' alt='Search' />
          <span className={styles.tooltiptext}>Поиск</span>
        </div>
        {auth && (
          <div onClick={onClickWrite} className={styles.tooltip}>
            <img src='./svg/write.svg' alt='Write' />
            <span className={styles.tooltiptext}>Написать</span>
          </div>
        )}
        <div onClick={onClickLogin} className={styles.tooltip}>
          <img src='./svg/login.svg' alt='Login' />
          <span className={styles.tooltiptext}>Профиль</span>
        </div>
      </div>
    </>
  );
}

export default Icons;
