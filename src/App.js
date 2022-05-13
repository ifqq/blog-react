import React from 'react';
import Main from './components/Main';
import Login from './components/Login';
import Profile from './components/Profile';
import PostForm from './components/PostForm';
import { useDispatch } from 'react-redux';
import { authMe } from './redux/actions/profile';
import { Layout, LayoutProfile } from './components/Layout';
import Post from './components/Post';
import { updatePosts } from './redux/actions/articles';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './App.scss';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [menuOpened, setMenuOpened] = React.useState(false);
  const [loginActive, setLoginActive] = React.useState(false);

  React.useEffect(() => {
    dispatch(authMe());
    dispatch(updatePosts());
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
            />
          }
        >
          <Route index element={<Main />} />
          <Route path='post/:id' element={<Post />} />
          <Route path='create-post' element={<PostForm />} />
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
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {loginActive && <Login active={loginActive} setActive={setLoginActive} />}
    </>
  );
}

export default App;
