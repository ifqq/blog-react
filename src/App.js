import React from 'react';
import Menu from './components/Menu';
import Main from './components/Main';
import Article from './components/Article';
import Header from './components/Header';
import Login from './components/Login';
import Profile from './components/Profile';
import ArticleForm from './components/ArticleForm';
import { useSelector, useDispatch } from 'react-redux';
import { authMe } from './redux/actions/profile';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import './App.scss';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [menuOpened, setMenuOpened] = React.useState(false);
  const [loginActive, setLoginActive] = React.useState(false);
  const [openPost, setOpenPost] = React.useState(true);
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
              {openPost ? <ArticleForm /> : <Main />}
              <div className='d-flex flex-column'>
                <Header
                  onClickLogin={() => {
                    state.profile.auth
                      ? navigate('/profile')
                      : setLoginActive(true);
                  }}
                />
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
              </div>
              <Menu
                onClickMenu={() => setMenuOpened(!menuOpened)}
                setActive={setLoginActive}
                opened={menuOpened}
              />
            </div>
          }
        />
        <Route
          path='/profile'
          element={
            <div className='dGrid'>
              <div className='d-flex flex-column'>
                <Header
                  onClickLogin={() => {
                    state.profile.auth
                      ? navigate('/profile')
                      : setLoginActive(true);
                  }}
                />
                <Profile />
              </div>
              <Menu
                onClickMenu={() => setMenuOpened(!menuOpened)}
                setActive={setLoginActive}
                opened={menuOpened}
              />
            </div>
          }
        />
        <Route path='posts' element={<ArticleForm />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      {loginActive && <Login active={loginActive} setActive={setLoginActive} />}
    </>
  );
}

export default App;
