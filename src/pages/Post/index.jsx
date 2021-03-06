import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { deletePost } from '../../redux/actions/articles';
import Comment from '../../components/Comment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createComment, updateComments } from '../../redux/actions/comments';

import styles from './Post.module.scss';

const schema = yup
  .object({
    commentValue: yup
      .string()
      .min(2, 'Минимум 2 символа')
      .max(200, 'Максимум 200 символов')
      .required('Это обязательное поле!'),
  })
  .required();

function Post() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [post, setPost] = React.useState({});
  let { id } = useParams();
  const userId = useSelector((state) => state.profile.id);
  const { comments } = useSelector((state) => state);

  const { handleSubmit, reset, register, formState } = useForm({
    defaultValues: {
      commentValue: '',
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/posts/${id}`
      );
      dispatch(updateComments(id));
      setPost(data);
      setIsLoading(false);
    };
    fetchData().catch(console.error);
  }, [id]);

  const handleClickDelete = () => {
    if (window.confirm('Вы действительно хотите удалить статью?')) {
      dispatch(deletePost(id));
      navigate('/');
    }
  };

  const onSubmit = (data) => {
    onCreateComment(data.commentValue);
  };

  const onCreateComment = (commentValue) => {
    dispatch(createComment(commentValue, id));
    reset({ commentValue: '' });
  };

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const createdAt = new Date(post.createdAt);
  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <>
          <ContentLoader
            speed={2}
            width={720}
            height={452}
            viewBox='0 0 720 452'
            backgroundColor='#dbdbdb'
            foregroundColor='#fafafa'
          >
            <rect x='227' y='129' rx='3' ry='3' width='50' height='20' />
            <rect x='72' y='129' rx='3' ry='3' width='145' height='20' />
            <rect x='72' y='161' rx='3' ry='3' width='335' height='40' />
            <rect x='72' y='213' rx='3' ry='3' width='441' height='40' />
            <rect x='72' y='278' rx='6' ry='6' width='584' height='18' />
            <rect x='72' y='310' rx='6' ry='6' width='330' height='18' />
            <rect x='72' y='310' rx='6' ry='6' width='330' height='18' />
          </ContentLoader>
          <ContentLoader
            speed={2}
            width={720}
            height={500}
            viewBox='0 0 720 500'
            backgroundColor='#dbdbdb'
            foregroundColor='#fafafa'
          >
            <rect x='72' y='109' rx='6' ry='6' width='508' height='18' />
            <rect x='72' y='48' rx='6' ry='6' width='584' height='18' />
            <rect x='72' y='79' rx='6' ry='6' width='555' height='18' />
            <rect x='72' y='139' rx='6' ry='6' width='584' height='18' />
            <rect x='72' y='270' rx='6' ry='6' width='508' height='18' />
            <rect x='72' y='209' rx='6' ry='6' width='584' height='18' />
            <rect x='72' y='240' rx='6' ry='6' width='555' height='18' />
            <rect x='72' y='300' rx='6' ry='6' width='584' height='18' />
            <rect x='72' y='440' rx='6' ry='6' width='508' height='18' />
            <rect x='72' y='379' rx='6' ry='6' width='584' height='18' />
            <rect x='72' y='410' rx='6' ry='6' width='555' height='18' />
            <rect x='72' y='470' rx='6' ry='6' width='584' height='18' />
          </ContentLoader>
        </>
      ) : (
        <>
          <div className={styles.img}>
            {post.photoUrl && (
              <img
                src={`${process.env.REACT_APP_API}${post.photoUrl}`}
                alt='img'
              />
            )}
          </div>
          <div className={styles.header}>
            <span>
              {createdAt.toLocaleDateString('ru-RU', options)}
              <img src='./svg/eye.svg' alt='Eye' />
              {post.views}
            </span>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
          {userId === post.user._id ? (
            <ul className={styles.creatorPanel}>
              <li onClick={() => navigate(`/edit-post/${id}`)}>
                Редактировать
              </li>
              <li onClick={handleClickDelete}>Удалить</li>
            </ul>
          ) : null}
          <div className={styles.fullText}>
            <p>{post.text}</p>
          </div>
          <div className={styles.comments}>
            <h3>Комментарии ({comments.length})</h3>
            {comments.map((item) => (
              <Comment
                key={item._id}
                fullName={item.user.fullName}
                createdAt={item.createdAt}
                text={item.text}
              />
            ))}

            <h3>Добавить комментарий</h3>
            <textarea
              className={
                formState.errors.commentValue ? `${styles.error}` : null
              }
              name='commentValue'
              {...register('commentValue')}
            />
            <span className={styles.signSpan}>
              {formState.errors.commentValue &&
                formState.errors.commentValue.message}
            </span>
            <button className={styles.btn} onClick={handleSubmit(onSubmit)}>
              Отправить
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Post;
