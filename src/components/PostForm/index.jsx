import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { editArticle, uploadArticle } from '../../redux/actions/articles';
import styles from './PostForm.module.scss';
import ContentLoader from 'react-content-loader';
import axios from 'axios';

function PostForm({ edit }) {
  const [fields, setFields] = React.useState({
    title: '',
    description: '',
    url: null,
    text: '',
    textUrl: '',
    editFile: false,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    setIsLoading(true);
    if (edit) {
      const upd = async () => {
        const { data } = await axios.get('http://localhost:5656/posts');
        const post = data.items.find((obj) => obj._id === id);
        if (post.photoUrl !== '') {
          setFields({
            title: post.title,
            description: post.description,
            textUrl: post.photoUrl,
            text: post.text,
          });
        } else {
          setFields({
            title: post.title,
            description: post.description,
            editFile: true,
            text: post.text,
          });
        }
      };
      upd().catch(console.error);
    } else {
      setFields({
        title: '',
        description: '',
        url: null,
        text: '',
        textUrl: '',
        editFile: false,
      });
    }
    setIsLoading(false);
  }, [location]);

  function handleChangeInput(event) {
    if (event.target.name === 'url') {
      setFields({ ...fields, [event.target.name]: event.target.files[0] });
    } else {
      setFields({ ...fields, [event.target.name]: event.target.value });
    }
  }

  const uploadFile = () => {
    if (edit) {
      dispatch(editArticle(fields, id));
      setFields({
        title: '',
        description: '',
        url: null,
        text: '',
        textUrl: '',
        editFile: false,
      });
      navigate(`/post/${id}`);
    } else {
      dispatch(uploadArticle(fields));
      setFields({ title: '', description: '', url: null, text: '' });
      navigate('/');
    }
  };

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={720}
          height={650}
          viewBox='0 0 720 650'
          backgroundColor='#dbdbdb'
          foregroundColor='#fafafa'
        >
          <rect x='0' y='90' rx='6' ry='6' width='157' height='15' />
          <rect x='0' y='30' rx='6' ry='6' width='400' height='30' />
          <rect x='0' y='110' rx='6' ry='6' width='602' height='90' />
          <rect x='0' y='230' rx='6' ry='6' width='200' height='15' />
          <rect x='0' y='250' rx='6' ry='6' width='442' height='45' />
          <rect x='0' y='320' rx='6' ry='6' width='145' height='15' />
          <rect x='0' y='340' rx='6' ry='6' width='602' height='300' />
          <rect x='465' y='250' rx='6' ry='6' width='122' height='45' />
        </ContentLoader>
      ) : (
        <>
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
            {!fields.editFile && edit ? (
              <span className={styles.textUrl}>{fields.textUrl}</span>
            ) : (
              <input
                onChange={handleChangeInput}
                name='url'
                type={'file'}
                disabled={!fields.editFile}
                accept='.jpg, .jpeg, .png'
              />
            )}

            <div
              className={styles.uploadBtn}
              onClick={
                !fields.editFile
                  ? () => setFields((prev) => ({ ...prev, editFile: true }))
                  : null
              }
            >
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
            {edit ? 'Сохранить' : 'Опубликовать'}
          </button>
        </>
      )}
    </div>
  );
}

export default PostForm;
