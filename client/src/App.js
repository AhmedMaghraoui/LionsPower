import 'antd/dist/antd.css';
import 'react-credit-cards/es/styles-compiled.css';
import { Routes, Route } from 'react-router';
import Layout from './Components/Layouts'
import SignInPage from './pages/SignIn.js';
import SignUpPage from './pages/Signup.js';
import MealPage from './pages/MealPage.js';
import {useState, useEffect} from 'react'
import {GlobalContext} from './Components/GlobalContext'
import NotFound from './pages/NotFound.js'
import UsersPage from './pages/UsersPage.js';
import CoachPage from './pages/CoachPage.js';
import ExercicesUserPage from './pages/ExercicesUserPage';
import CoachExercies from './Components/CoachExercies';
import PaymenPage from './pages/PaymenPage';
import Home from './pages/Home/pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
  const [globalState, setGlobalState] = useState({
    userId: null,
    userName:null,
    token: null,
    isCoach: null,
    isPremium: null
  })
  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem('token'))
    const userName = JSON.parse(window.localStorage.getItem('userName'))
    const isCoach = JSON.parse(window.localStorage.getItem('isCoach'))
    const isPremium = JSON.parse(window.localStorage.getItem('isPremium'))
    if (token){
      console.log(globalState)
      setGlobalState({...globalState, token: token,userName,isCoach,isPremium})
    }
  }, [])
  return (
    <GlobalContext.Provider value={{globalState, setGlobalState}}>
      <Layout>
        <Routes>
        <Route exact path='/' element={ <Home/> }></Route>
          <Route exact path='/about' element={ <About/> }></Route>
          <Route exact path='/contact' element={ <Contact/> }></Route>
          <Route exact path='/prices' element={ <PaymenPage/>}></Route>
          <Route exact path='/exercices' element={ <ExercicesUserPage /> }></Route>
          <Route path='/signin' element={ <SignInPage /> }></Route>
          <Route path='/signup' element={ <SignUpPage/> }></Route>
          <Route path='/coaching/*' element={ <UsersPage/> }></Route>
          <Route path='/meal' element={<MealPage />}></Route>
          <Route path='/*' element={ <NotFound/> }></Route>

        </Routes>
      </Layout>
    </GlobalContext.Provider>

  );
}

export default App;
