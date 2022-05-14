import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePosts } from '../../redux/actions/articles';

import styles from './Pagination.module.scss';

export const Pagination = ({ searchValue, currentPage, maxPage }) => {
  const dispatch = useDispatch();
  const Plus = () => {
    dispatch(updatePosts(searchValue, currentPage + 1));
  };
  const Minus = () => {
    dispatch(updatePosts(searchValue, currentPage - 1));
  };
  return (
    <div className={styles.pagination}>
      <div>
        <img
          className={
            currentPage <= 1
              ? `${styles.disabled} ${styles.left}`
              : `${styles.left}`
          }
          disabled={currentPage <= 1}
          src='./svg/arrow.svg'
          onClick={currentPage <= 1 ? null : Minus}
        />
        <img
          disabled={currentPage >= maxPage}
          className={currentPage >= maxPage ? `${styles.disabled}` : null}
          src='./svg/arrow.svg'
          onClick={currentPage >= maxPage ? null : Plus}
        />
      </div>
      <span>
        Страница {currentPage} из {maxPage}
      </span>
    </div>
  );
};
