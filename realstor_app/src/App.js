import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import Profile from './Pages/Profile';
import About from './Pages/About';
import SignUp from './Pages/SignUp';
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute';

export default function App() {
  return (
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/sign-in' element={<SignIn/>}/>
    <Route path='/sign-up' element={<SignUp/>}/>
    <Route element={<PrivateRoute/>}>
      <Route path='/profile' element={<Profile/>}/>
    </Route>
    <Route path='/about ' element={<About/>}/>
    
  </Routes>
  </BrowserRouter>
  )
}
