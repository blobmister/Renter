import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Login from "./Login.jsx"
import Register from './Register.jsx';
import Dashboard from './components/dashboard.jsx';
import CataloguePage from './Catalogue.jsx';
import { UserProvider } from './UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalogue" element={<CataloguePage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
