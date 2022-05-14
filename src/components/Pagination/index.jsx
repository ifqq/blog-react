import React from 'react';
import { useDispatch } from 'react-redux';
import { updatePosts } from '../../redux/actions/articles';
import { getUserComments, getUserPosts } from '../../redux/actions/profile';
import styles from './Pagination.module.scss';

export const Pagination = ({
  searchValue,
  currentPage,
  maxPage,
  id,
  selected,
}) => {
  const dispatch = useDispatch();
  const Plus = () => {
    if (id) {
      if (!selected) {
        dispatch(getUserPosts(searchValue, currentPage + 1, id));
      } else {
        dispatch(getUserComments(searchValue, currentPage + 1, id));
      }
    } else {
      dispatch(updatePosts(searchValue, currentPage + 1));
    }
  };
  const Minus = () => {
    if (id) {
      if (!selected) {
        dispatch(getUserPosts(searchValue, currentPage - 1, id));
      } else {
        dispatch(getUserComments(searchValue, currentPage - 1, id));
      }
    } else {
      dispatch(updatePosts(searchValue, currentPage - 1));
    }
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
          src='./svg/arrow.svg'
          onClick={currentPage <= 1 ? null : Minus}
        />
        <img
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
