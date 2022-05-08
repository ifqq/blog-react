import React from 'react';
import RichTextArea from '../RichTextArea/RichTextArea';

import styles from './ArticleForm.module.scss';

function ArticleForm() {
  return (
    <div className='wrapper'>
      <input className='title' type='text' />
      <h3>Короткое описание</h3>
      <textarea type='text' className='description' />
      <h3>Ссылка на изображение:</h3>
      <div className='upload'>
        <input type='text' />
        <button>
          <img src='./svg/upload.svg' alt='Upload' />
          Загрузить
        </button>
      </div>
      <h3>Полное описание</h3>
    </div>
  );
}

export default ArticleForm;
