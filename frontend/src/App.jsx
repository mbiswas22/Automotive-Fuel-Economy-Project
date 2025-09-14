import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Detail from './pages/Detail'
import Favorites from './pages/Favorites'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App(){
  return (
    <div className="app-container">
      <header className="topbar">
        <h1>Auto MPG Explorer</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home/>} />
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
