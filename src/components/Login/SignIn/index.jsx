import React from 'react';
import axios from 'axios';

import styles from './SignIn.module.scss';

function SignIn() {
  const [fields, setFields] = React.useState({ email: '', password: '' });

  const handleClickLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:5656/auth/login', {
        email: fields.email,
        password: fields.password,
      });
      localStorage.setItem('token', data.token);
      setFields({ email: '', password: '' });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  function handleChangeInput(event) {
    setFields({ ...fields, [event.target.name]: event.target.value });
  }
  return (
    <>
      <h4>Email</h4>
      <input name='email' onChange={handleChangeInput} value={fields.email} />
      <h4>Пароль</h4>
      <input
        name='password'
        onChange={handleChangeInput}
        value={fields.password}
        type='password'
      />
      <button className={styles.btn} onClick={handleClickLogin}>
        Войти
      </button>
    </>
  );
}

export default SignIn;
