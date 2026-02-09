import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Pages/SignUp'
import SignIn from './Pages/SignIn'
import Home from './Pages/Home'
import CustomAlerts from './components/CustomAlerts'

export const serverUrl ="http://localhost:8000"

const App = () => {
  return (
    <div>
      <CustomAlerts/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
      </Routes>
    </div>
  )
}

export default App
