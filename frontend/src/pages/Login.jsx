import React, { useState } from 'react'

export default function Login(){
  const [username, setUsername] = useState(localStorage.getItem('username') || '')
  const [input, setInput] = useState('')

  function handleLogin(e){
    e.preventDefault()
    if(input.trim().length>0){
      localStorage.setItem('username', input.trim())
      setUsername(input.trim())
      setInput('')
    }
  }
  function handleLogout(){
    localStorage.removeItem('username')
    setUsername('')
  }

  if(username){
    return (
      <div>
        <h2>Welcome, {username}!</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter username" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
