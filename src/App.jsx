import { useState } from 'react'
import './App.css'
import SignUpLoginForm from './components/LoginForm/LoginForm'
import {BrowserRouter} from 'react-router-dom'


function App() {


  return (
    <div className="App">
    <BrowserRouter>
      <SignUpLoginForm />
    </BrowserRouter>
    </div>
  )
}

export default App
