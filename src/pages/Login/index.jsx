import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import styles from './Login.module.scss';

function Login({ setActive }) {
  const { auth } = useSelector((state) => state.profile);
  const [reg, setReg] = React.useState(false);
  const LoginPage = ({ children, title }) => {
    return (
      <>
        <div className={styles.bg} onClick={() => setActive(false)}>
          <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
            <div className={styles.header}>
              <h2>{title}</h2>
              <img
                className={styles.img}
                src='./svg/xSearch.svg'
                alt='X'
                onClick={() => setActive(false)}
              />
            </div>
            {children}
            <div className={styles.footer}>
              <div
                className={`${styles.switchBtn} ${reg && styles.switchOn}`}
                onClick={() => setReg(!reg)}
              ></div>
              <span>{reg ? 'Вход' : 'Регистрация'}</span>
            </div>
          </div>
        </div>
      </>
    );
  };
  if (auth) {
    return <Navigate to='profile' />;
  }
  if (!reg) {
    return (
      <LoginPage title='Вход в аккаунт'>
        <SignIn onCloseLogin={() => setActive(false)} />
      </LoginPage>
    );
  } else {
    return (
      <LoginPage title='Регистрация'>
        <SignUp onCloseLogin={() => setActive(false)} />
      </LoginPage>
    );
  }
}

export default Login;
