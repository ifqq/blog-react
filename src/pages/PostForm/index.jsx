import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { editArticle, uploadArticle } from '../../redux/actions/articles';
import styles from './PostForm.module.scss';
import ContentLoader from 'react-content-loader';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    title: yup
      .string()
      .min(3, 'Минимум 3 символа')
      .max(100, 'Максимум 100 символов')
      .required('Это обязательное поле!'),
    description: yup
      .string()
      .min(3, 'Минимум 3 символа')
      .max(200, 'Максимум 200 символов')
      .required('Это обязательное поле!'),
    text: yup
      .string()
      .min(3, 'Минимум 3 символа')
      .max(1000, 'Максимум 1000 символов')
      .required('Это обязательное поле!'),
  })
  .required();

function PostForm({ edit }) {
  const [fields, setFields] = React.useState({
    url: null,
    textUrl: '',
    editFile: false,
  });
  const { handleSubmit, reset, setValue, register, formState } = useForm({
    defaultValues: {
      title: '',
      description: '',
      text: '',
    },
    resolver: yupResolver(schema),
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
        const { data } = await axios.get(`${process.env.REACT_APP_API}posts`);
        const post = data.items.find((obj) => obj._id === id);
        if (post.photoUrl !== '') {
          setFields({
            textUrl: post.photoUrl,
          });
          setValue('title', post.title);
          setValue('description', post.description);
          setValue('text', post.text);
        } else {
          setValue('title', post.title);
          setValue('description', post.description);
          setValue('text', post.text);
          setFields({
            editFile: true,
          });
        }
      };
      upd().catch(console.error);
    } else {
      reset({
        title: '',
        description: '',
        text: '',
      });
      setFields({
        url: null,
        textUrl: '',
        editFile: false,
      });
    }
    setIsLoading(false);
  }, [location]);

  const onSubmit = (data) => {
    uploadFile(data);
  };

  function handleChangeInput(event) {
    if (event.target.name === 'url') {
      setFields({ ...fields, [event.target.name]: event.target.files[0] });
    } else {
      setFields({ ...fields, [event.target.name]: event.target.value });
    }
  }

  const uploadFile = (data) => {
    const dataObj = { ...data, ...fields };
    if (edit) {
      dispatch(editArticle(dataObj, id));
      setFields({
        url: null,
        textUrl: '',
        editFile: false,
      });
      reset({
        title: '',
        description: '',
        text: '',
      });
      navigate(`/`);
    } else {
      dispatch(uploadArticle(dataObj));
      setFields({ url: null });
      reset({
        title: '',
        description: '',
        text: '',
      });
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
            className={
              formState.errors.title
                ? `${styles.title} ${styles.errorTitle}`
                : `${styles.title}`
            }
            {...register('title')}
            type='text'
            placeholder='Введите заголовок...'
          />
          <span className={styles.signSpan}>
            {formState.errors.title && formState.errors.title.message}
          </span>
          <h3>Короткое описание</h3>
          <textarea
            name='description'
            {...register('description')}
            type='text'
            className={
              formState.errors.description
                ? `${styles.description} ${styles.error}`
                : `${styles.description}`
            }
          />
          <span className={styles.signSpan}>
            {formState.errors.description &&
              formState.errors.description.message}
          </span>
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
            {...register('text')}
            type='text'
            className={
              formState.errors.text
                ? `${styles.text} ${styles.error}`
                : `${styles.text}`
            }
          />
          <span className={styles.signSpan}>
            {formState.errors.text && formState.errors.text.message}
          </span>
          <button onClick={handleSubmit(onSubmit)} className={styles.btn}>
            {edit ? 'Сохранить' : 'Опубликовать'}
          </button>
        </>
      )}
    </div>
  );
}

export default PostForm;
