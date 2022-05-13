import React from 'react';
import Header from '../Header';
import Menu from '../Menu';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import styles from './Layout.module.scss';
import Article from '../Article';

export const Layout = ({ setMenuOpened, menuOpened, setLoginActive }) => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const filtredItems = state.articles.filter((item) =>
    item.title.toLowerCase().includes(state.searchValue.toLowerCase())
  );
  return (
    <div className={styles.main}>
      <Outlet />
      <div className='d-flex flex-column'>
        <Header
          onClickLogin={() => {
            state.profile.auth ? navigate('/profile') : setLoginActive(true);
          }}
        />
        {(filtredItems ? filtredItems : state.articles).map((obj) => (
          <Article
            key={obj._id}
            title={obj.title}
            openFullPost={() => navigate(`post/${obj._id}`)}
            description={obj.description}
            photoUrl={obj.photoUrl}
            createdAt={obj.createdAt}
            views={obj.views}
          />
        ))}
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
