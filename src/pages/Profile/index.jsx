import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUserComments, getUserPosts } from '../../redux/actions/profile';
import Article from '../../components/Article';
import Comment from '../../components/Comment';
import { Pagination } from '../../components/Pagination';

import styles from './Profile.module.scss';

function Profile() {
  const [selected, setSelected] = React.useState(false);
  const { profile } = useSelector((state) => state);
  const { userPosts } = useSelector((state) => state.profile);
  const { userComments } = useSelector((state) => state.profile);
  const id = useSelector((state) => state.profile.id);
  const currentPage = useSelector(
    (state) => state.profile.userPosts.currentPage
  );
  const currCommentPage = useSelector(
    (state) => state.profile.userComments.currentPage
  );
  const maxCommentPage = useSelector(
    (state) => state.profile.userComments.maxPage
  );
  const maxPage = useSelector((state) => state.profile.userPosts.maxPage);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (profile.auth) {
      setIsLoading(true);
      dispatch(getUserPosts('', currentPage, profile.id));
      dispatch(getUserComments('', currCommentPage, profile.id));
      setIsLoading(false);
    }
  }, [selected]);

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
      {!selected
        ? userPosts.items.map((obj) => (
            <Article
              key={`user${obj._id}`}
              title={obj.title}
              openFullPost={() => navigate(`/post/${obj._id}`)}
              description={obj.description}
              photoUrl={obj.photoUrl}
              createdAt={obj.createdAt}
              views={obj.views}
              loading={isLoading}
            />
          ))
        : userComments.items.map((item) => (
            <Comment
              key={`user${item._id}`}
              fullName={item.user.fullName}
              createdAt={item.createdAt}
              text={item.text}
            />
          ))}
      <Pagination
        searchValue=''
        currentPage={!selected ? currentPage : currCommentPage}
        maxPage={!selected ? maxPage : maxCommentPage}
        id={id}
        selected={selected}
      />
    </div>
  );
}

export default Profile;
