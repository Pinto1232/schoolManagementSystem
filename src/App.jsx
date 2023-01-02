import { useState } from 'react'
import './App.css'
import SignUpLoginForm from './components/LoginForm/LoginForm'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'



function App() {


  return (
    <div className="App">
      <SignUpLoginForm />
      <Router>
         <dashboard />
      </Router>
    </div>
  )
}

export default App
