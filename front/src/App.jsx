import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useUser } from './UserContext';
import './App.css'
import TopBar from './components/topBar.jsx'

function App() {
  let navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className='landingContainer'>
      <div className="body">
          <TopBar />
        <input className="search-bar" type="text" name="search" placeholder="enter keyword(s)"></input>
        <input className="search-bar" type="text" name="location" placeholder="enter location"></input>
        <button className="search" onClick={() => navigate('/catalogue')}>search</button>
        <button className="profile-button" onClick={() => {user ? navigate('/dashboard') : navigate('/login')}}>{ user ? "My Profile" : "Login/Register" }</button>
      </div>

    </div>
  )
}

export default App
