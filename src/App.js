import React from 'react';
import Main from './components/Main';
import Article from './components/Article';
import Login from './components/Login';
import Profile from './components/Profile';
import PostForm from './components/PostForm';
import { useSelector, useDispatch } from 'react-redux';
import { authMe } from './redux/actions/profile';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './App.scss';
import Layout from './Layout';
import Post from './components/Post';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [menuOpened, setMenuOpened] = React.useState(false);
  const [loginActive, setLoginActive] = React.useState(false);
  const filtredItems = state.articles.filter((item) =>
    item.title.toLowerCase().includes(state.searchValue.toLowerCase())
  );

  React.useEffect(() => {
    dispatch(authMe());
  }, [location]);

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <div className='App'>
              <Main />
              <Layout
                setMenuOpened={setMenuOpened}
                menuOpened={menuOpened}
                setLoginActive={setLoginActive}
              >
                {(filtredItems ? filtredItems : state.articles).map((obj) => (
                  <Article
                    key={obj.id}
                    title={obj.title}
                    text={obj.text}
                    image={obj.image}
                    date={obj.date}
                    viewing={obj.viewing}
                  />
                ))}
              </Layout>
            </div>
          }
        />
        <Route
          path='post/:id'
          element={
            <div className='App'>
              <Post />
              <Layout
                setMenuOpened={setMenuOpened}
                menuOpened={menuOpened}
                setLoginActive={setLoginActive}
              >
                {(filtredItems ? filtredItems : state.articles).map((obj) => (
                  <Article
                    key={obj.id}
                    title={obj.title}
                    text={obj.text}
                    image={obj.image}
                    date={obj.date}
                    viewing={obj.viewing}
                  />
                ))}
              </Layout>
            </div>
          }
        />
        <Route
          path='create-post'
          element={
            <div className='App'>
              <PostForm />
              <Layout
                setMenuOpened={setMenuOpened}
                menuOpened={menuOpened}
                setLoginActive={setLoginActive}
              >
                {(filtredItems ? filtredItems : state.articles).map((obj) => (
                  <Article
                    key={obj.id}
                    title={obj.title}
                    text={obj.text}
                    image={obj.image}
                    date={obj.date}
                    viewing={obj.viewing}
                  />
                ))}
              </Layout>
            </div>
          }
        />
        <Route
          exact
          path='/profile'
          element={
            <div className='dGrid'>
              <Layout
                setMenuOpened={setMenuOpened}
                menuOpened={menuOpened}
                setLoginActive={setLoginActive}
              >
                <Profile />
              </Layout>
            </div>
          }
        />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {loginActive && <Login active={loginActive} setActive={setLoginActive} />}
    </>
  );
}

export default App;
