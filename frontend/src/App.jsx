import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import CustomAlerts from './components/CustomAlerts'
import Shorts from './Pages/Shorts/Shorts'
import getCurrentUser from './CustomHooks/getCurrentUser'

export const serverUrl ="http://localhost:8000"

const App = () => {
  getCurrentUser();
  return (
    <>
      <CustomAlerts/>
      <Routes>
        <Route path="/" element={<Home/>}>
         <Route path="/shorts" element={<Shorts />} />
        </Route>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
       
      </Routes>
    </>
  )
}

export default App
