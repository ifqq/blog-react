import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import styles from './Profile.module.scss';

function Profile() {
  const [selected, setSelected] = React.useState(false);
  const { profile } = useSelector((state) => state);

  if (!profile.auth) {
    return <Navigate to='/' />;
  }

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const createdAt = new Date(profile.createdAt);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>{profile.fullName}</h2>
        <p>
          Дата регистрации:{' '}
          <b>{createdAt.toLocaleDateString('ru-RU', options)}</b>
        </p>
      </div>
      <div className={styles.btn}>
        <button
          className={`${!selected && styles.btnSelected}`}
          onClick={() => setSelected(false)}
        >
          Статьи
        </button>
        <button
          className={`${selected && styles.btnSelected}`}
          onClick={() => setSelected(true)}
        >
          Комментарии
        </button>
      </div>
    </div>
  );
}

export default Profile;