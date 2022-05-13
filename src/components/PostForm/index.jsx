import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadArticle } from '../../redux/actions/articles';
import styles from './PostForm.module.scss';

function PostForm() {
  const dispatch = useDispatch();
  const { articles } = useSelector((state) => state);
  const [fields, setFields] = React.useState({
    title: '',
    description: '',
    url: null,
    text: '',
  });
  function handleChangeInput(event) {
    if (event.target.name === 'url') {
      setFields({ ...fields, [event.target.name]: event.target.files[0] });
    } else {
      setFields({ ...fields, [event.target.name]: event.target.value });
    }
  }

  const uploadFile = () => {
    dispatch(uploadArticle(fields));
    setFields({ title: '', description: '', url: null, text: '' });
  };

  return (
    <div className={styles.wrapper}>
      <textarea
        name='title'
        value={fields.title}
        onChange={handleChangeInput}
        className={styles.title}
        type='text'
        placeholder='Введите заголовок...'
      />
      <h3>Короткое описание</h3>
      <textarea
        name='description'
        value={fields.description}
        onChange={handleChangeInput}
        type='text'
        className={styles.description}
      />
      <h3>Ссылка на изображение:</h3>
      <label className={styles.upload}>
        <div className={styles.uploadInput}>
          <input
            onChange={handleChangeInput}
            name='url'
            type='file'
            accept='.jpg, .jpeg, .png'
          />
        </div>
        <div className={styles.uploadBtn}>
          <img src='./svg/upload.svg' alt='Upload' />
          <p>Загрузить</p>
        </div>
      </label>
      <h3>Полное описание</h3>
      <textarea
        name='text'
        value={fields.text}
        onChange={handleChangeInput}
        type='text'
        className={styles.text}
      />
      <button onClick={uploadFile} className={styles.btn}>
        Опубликовать
      </button>
    </div>
  );
}

export default PostForm;
