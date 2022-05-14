import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Menu.module.scss';

function Menu({ onClickMenu, opened, setActive }) {
  const { profile } = useSelector((state) => state);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const createdAt = new Date(profile.createdAt);

  const login = () => {
    onClickMenu();
    setActive(true);
  };

  return (
    <>
      {opened ? (
        <div className={styles.menuOpen}>
          {profile.auth ? (
            <>
              <div className={styles.menuHeader}>
                <h2>{profile.fullName}</h2>
                <p>
                  Дата регистрации:{' '}
                  {createdAt.toLocaleDateString('ru-RU', options)}
                </p>
              </div>
              <div className={styles.menuNav}>
                <button onClick={() => navigate('/')}>Главная</button>
                <button onClick={() => navigate('/profile')}>
                  Мой профиль
                </button>
                <button onClick={() => navigate('/create-post')}>
                  Создать запись
                </button>
                <button onClick={logOut}>Выйти</button>
              </div>
            </>
          ) : (
            <div className={styles.menuNav}>
              <button onClick={() => navigate('/')}>Главная</button>
              <button onClick={login}>Войти</button>
            </div>
          )}

          <div className={styles.menuFooter} onClick={onClickMenu}>
            <img src='./svg/x.svg' alt='' />
            <p>МЕНЮ</p>
          </div>
        </div>
      ) : (
        <div className={styles.menu} onClick={onClickMenu}>
          <div className={styles.items}>
            <p>МЕНЮ</p>
            <img src='./svg/burger.svg' alt='' />
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
