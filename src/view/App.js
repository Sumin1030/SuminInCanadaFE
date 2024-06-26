// import logo from './logo.svg';
// import './App.css';
// // index.js에서 이 코드를 불러다 씀
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import axios from "../util/axiosUtil";
import { useEffect } from 'react';
import { useState } from 'react';
import MainPage from './MainPage';
import Login from './Login';
import language from "../util/LanguageUtil";
import { useSelector, useDispatch } from 'react-redux';
import { languageActions } from '../store/languageSlice';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Works from "../resume/Works";
import Experience from "../resume/Experience";
import Project from "../resume/Project";
import About from "../resume/About";

// import Calander from '../component/Calendar';

function App() {
  // const callApi = ()=>{
  //   axios.get("/api").then((res)=>{console.log("app.js call get api callback : ", res.data.result)});
  //   axios.post("/api").then((res)=>{console.log("app.js call post api callback : ", res.data.result)});
  // };
  const [isLogined, setIsLogined] = useState(false);
  const [content, setContent] = useState();

  const LOGIN = <Login changeState={setIsLogined} />;

  const getMain = (lang) => {
    const MAIN = <MainPage changeState={setIsLogined} lang={lang}/>;
    return MAIN;
  }

  const dispatch = useDispatch();
  const langState = useSelector(state => state.language.lang);

  // 두 번째 인자에 빈 배열로 넣으면 처음 렌더링 시에만 함수 호출됨.
  useEffect(()=> {
    console.log(language.getLangObj);
      axios.get(`/api/isLogined`).then((res) => {
        // console.log('lang', res.data.lang, 'state', langState);
        // 세션에 language 초기값 저장
        const lang = res.data.lang;
        console.log(lang);
        if(lang && langState != lang && langState != lang?.val) {
          const langObj = language.getLangObj(lang);
          console.log(langObj);
          dispatch(languageActions.changeLang(langObj));
        }
        if(isLogined == 'enter') {
          setContent(getMain());
        }
        else if(res && !res.data.isLogined) {
          setContent(LOGIN);
        } else if(res && res.data.isLogined) setContent(getMain(lang));
      });
  }, [isLogined]);

  return (
    <div className="app">
      <HashRouter>
        <Routes>
          <Route path='/resume' element={<About />}></Route>
          <Route path='/resume/works' element={<Works />}></Route>
          <Route path='/resume/works/experience' element={<Experience />}></Route>
          <Route path='/resume/works/project' element={<Project />}></Route>
          <Route path='/' element={content}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
  // return <Calander />
}

export default App;