import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useUser } from './UserContext';
import './App.css'

function App() {
  let navigate = useNavigate();
  const {user} = useUser();

  return (
    <div className='landingContainer'>
      <div className='header'>
        <p>Logo</p>
        {user.email}
      </div>
      <div className='body'>
        <div className='sidebar'>
          <div className='search'>
            <p>Search</p>
          </div>
          <div className='profile'>
            <ul>
              <li>My Profile</li>
              <li>Conversations</li>
              <li>Items Listed</li>
              <li>Items Saved</li>
            </ul>
            
            <button onClick={() => {console.log("hi"); navigate("/dashboard")}}>Go to Dashboard</button>
          </div>
        </div>
        <div className='map'></div>
      </div>
    </div>
  )
}

export default App
