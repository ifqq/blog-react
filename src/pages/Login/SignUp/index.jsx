import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './SignUp.module.scss';

const schema = yup
  .object({
    fullName: yup.string().min(3, 'Слишком короткое имя'),
    email: yup
      .string()
      .email('Неверная почта')
      .required('Это обязательное поле!'),
    password: yup
      .string()
      .min(6, 'Пароль должен быть не менее 6 символов')
      .required('Это обязательное поле!'),
  })
  .required();

function SignUp() {
  const [hidePass, setHidePass] = React.useState(true);

  const { handleSubmit, reset, register, formState } = useForm({
    defaultValues: { fullName: '', email: '', password: '' },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (fields) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}auth/register`,
        {
          fullName: fields.fullName,
          email: fields.email,
          password: fields.password,
        }
      );
      localStorage.setItem('token', data.token);
      reset({ fullName: '', email: '', password: '' });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h4>Имя и фамилия</h4>
      <input
        className={
          formState.errors.fullName
            ? `${styles.signInput} ${styles.error}`
            : `${styles.signInput}`
        }
        name='fullName'
        {...register('fullName')}
      />
      <span className={styles.signSpan}>
        {formState.errors.fullName && formState.errors.fullName.message}
      </span>
      <h4>Email</h4>
      <input
        className={
          formState.errors.email
            ? `${styles.signInput} ${styles.error}`
            : `${styles.signInput}`
        }
        name='email'
        {...register('email')}
      />
      <span className={styles.signSpan}>
        {formState.errors.email && formState.errors.email.message}
      </span>
      <h4>Пароль</h4>
      <div
        className={
          formState.errors.password
            ? `${styles.signPass} ${styles.error}`
            : `${styles.signPass}`
        }
      >
        <input
          name='password'
          type={hidePass ? 'password' : 'text'}
          {...register('password')}
        />
        <img
          className={styles.passEye}
          src={hidePass ? './svg/passEyeX.svg' : './svg/passEye.svg'}
          alt='Eye'
          onClick={() => setHidePass(!hidePass)}
        />
      </div>
      <span className={styles.signSpan}>
        {formState.errors.password && formState.errors.password.message}
      </span>
      <button className={styles.btn} onClick={handleSubmit(onSubmit)}>
        Зарегистрироваться
      </button>
    </>
  );
}

export default SignUp;
