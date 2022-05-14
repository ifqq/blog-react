import React from 'react';
import Header from '../Header';
import Menu from '../Menu';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Article from '../Article';
import { Pagination } from '../Pagination';

import styles from './Layout.module.scss';

export const Layout = ({
  setMenuOpened,
  menuOpened,
  setLoginActive,
  isLoading,
}) => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const searchValue = useSelector((state) => state.searchValue);
  const currentPage = useSelector((state) => state.articles.currentPage);
  const maxPage = useSelector((state) => state.articles.maxPage);

  return (
    <div className={styles.main}>
      <Outlet />
      <div className='d-flex flex-column'>
        <Header
          onClickLogin={() => {
            state.profile.auth ? navigate('/profile') : setLoginActive(true);
          }}
        />
        {state.articles.items.map((obj) => (
          <Article
            key={obj._id}
            title={obj.title}
            openFullPost={() => navigate(`post/${obj._id}`)}
            description={obj.description}
            photoUrl={obj.photoUrl}
            createdAt={obj.createdAt}
            views={obj.views}
            loading={isLoading}
          />
        ))}
        <Pagination
          searchValue={searchValue}
          currentPage={currentPage}
          maxPage={maxPage}
        />
      </div>
      <Menu
        onClickMenu={() => setMenuOpened(!menuOpened)}
        setActive={setLoginActive}
        opened={menuOpened}
      />
    </div>
  );
};

export const LayoutProfile = ({
  setMenuOpened,
  menuOpened,
  setLoginActive,
}) => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  return (
    <div className={styles.profile}>
      <div className='d-flex flex-column'>
        <Header
          onClickLogin={() => {
            state.profile.auth ? navigate('/profile') : setLoginActive(true);
          }}
        />
        <Outlet />
      </div>
      <Menu
        onClickMenu={() => setMenuOpened(!menuOpened)}
        setActive={setLoginActive}
        opened={menuOpened}
      />
    </div>
  );
};
