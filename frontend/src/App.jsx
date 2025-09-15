import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Detail from './pages/Detail'
import Favorites from './pages/Favorites'
import About from './pages/About'
import Login from './pages/Login'
import { useAuth } from './pages/AuthContext'
import 'react-toastify/dist/ReactToastify.css'; // Import first
import { ToastContainer, toast } from 'react-toastify'; // Then this

export default function App(){
  const { user, logout } = useAuth();
  return (
    <div className="app-container">
      <ToastContainer />
      <header className="topbar">
        <h1>Automotive Fuel Economy</h1>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/about">About</Link>
          {user ? (
        <>
          <Link onClick={logout}>Logout</Link>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
          {/* <Link to="/login">Login</Link> */}
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/cars/:id" element={<Detail/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
    </div>
  )
}
