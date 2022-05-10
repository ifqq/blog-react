import React from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children, setMenuOpened, menuOpened, setLoginActive }) => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  return (
    <>
      <div className='d-flex flex-column'>
        <Header
          onClickLogin={() => {
            state.profile.auth ? navigate('/profile') : setLoginActive(true);
          }}
        />
        {children}
      </div>
      <Menu
        onClickMenu={() => setMenuOpened(!menuOpened)}
        setActive={setLoginActive}
        opened={menuOpened}
      />
    </>
  );
};

export default Layout;
