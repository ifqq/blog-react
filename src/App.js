import React from 'react';
import Main from './pages/Main';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PostForm from './pages/PostForm';
import { useDispatch } from 'react-redux';
import { authMe } from './redux/actions/profile';
import { Layout, LayoutProfile } from './components/Layout';
import Post from './pages/Post';
import { updatePosts } from './redux/actions/articles';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { NotFound } from './pages/NotFound';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [menuOpened, setMenuOpened] = React.useState(false);
  const [loginActive, setLoginActive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    dispatch(authMe());
    dispatch(updatePosts());
    setIsLoading(false);
  }, [location]);

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Layout
              setMenuOpened={setMenuOpened}
              menuOpened={menuOpened}
              setLoginActive={setLoginActive}
              isLoading={isLoading}
            />
          }
        >
          <Route index element={<Main />} />
          <Route path='post/:id' element={<Post />} />
          <Route path='create-post' element={<PostForm />} />
          <Route path='edit-post/:id' element={<PostForm edit />} />
          <Route path='not-found' element={<NotFound />} />
        </Route>
        <Route
          exact
          path='/profile'
          element={
            <LayoutProfile
              setMenuOpened={setMenuOpened}
              menuOpened={menuOpened}
              setLoginActive={setLoginActive}
            />
          }
        >
          <Route index element={<Profile />} />
        </Route>
        <Route path='*' element={<Navigate to='/not-found' />} />
      </Routes>
      {loginActive && <Login active={loginActive} setActive={setLoginActive} />}
    </>
  );
}

export default App;
