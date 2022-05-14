import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchValue } from '../../../redux/actions/search';

import styles from './Search.module.scss';

function Search({ onClickClose }) {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.searchValue);

  return (
    <>
      <input
        className={styles.input}
        value={searchValue}
        onChange={(event) => dispatch(setSearchValue(event.target.value))}
        placeholder='Поиск статьи по заголовку или тексту...'
      />
      <img
        className={styles.img}
        src='./svg/xSearch.svg'
        alt='X'
        onClick={onClickClose}
      />
    </>
  );
}

export default Search;
