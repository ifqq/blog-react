import React from 'react';
import axios from 'axios';

import styles from './SignUp.module.scss';

function SignUp() {
  const [fields, setFields] = React.useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleClickLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:5656/auth/register', {
        fullName: fields.fullName,
        email: fields.email,
        password: fields.password,
      });
      localStorage.setItem('token', data.token);
      setFields({ fullName: '', email: '', password: '' });
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
      <h4>Имя и фамилия</h4>
      <input
        name='fullName'
        onChange={handleChangeInput}
        value={fields.fullName}
      />
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
        Зарегистрироваться
      </button>
    </>
  );
}

export default SignUp;
