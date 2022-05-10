import React from 'react';
// import RichTextArea from '../RichTextArea/RichTextArea';
// <RichTextArea />
import styles from './PostForm.module.scss';

function PostForm() {
  return (
    <div className={styles.wrapper}>
      <textarea
        className={styles.title}
        type='text'
        placeholder='Введите заголовок...'
      />
      <h3>Короткое описание</h3>
      <textarea type='text' className={styles.description} />
      <h3>Ссылка на изображение:</h3>
      <div className={styles.upload}>
        <input value='' />
        <button>
          <img src='./svg/upload.svg' alt='Upload' />
          Загрузить
        </button>
      </div>
      <h3>Полное описание</h3>
      <textarea type='text' className={styles.text} />
      <button className={styles.btn}>Опубликовать</button>
    </div>
  );
}

export default PostForm;
