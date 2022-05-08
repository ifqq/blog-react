import React from 'react';
import Icons from './Icons';
import Search from './Search';
import { clearSearchValue } from '../../redux/actions/search';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

function Header({ onClickLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSearch, setOpenSearch] = React.useState(false);

  const handleClickClose = () => {
    dispatch(clearSearchValue());
    setOpenSearch(false);
  };

  return (
    <div className={`${styles.wrapper}  ${openSearch && styles.bgColor}`}>
      {openSearch ? (
        <Search onClickClose={handleClickClose} />
      ) : (
        <Icons
          onClickSearch={() => setOpenSearch(true)}
          navToHome={() => navigate('/')}
          onClickLogin={onClickLogin}
        />
      )}
    </div>
  );
}

export default Header;
