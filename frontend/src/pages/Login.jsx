import React, { useState } from 'react'
import { useAuth } from './AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login(){
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const { login, user } = useAuth(); // Destructure login and user from useAuth()
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await login(username, password);
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
    navigate('/dashboard'); // Redirects to dashboard
    toast.success("Login Successful!");
  } catch (error) {
    console.error('Login failed:', error.message);
    toast.error(`Login failed: ${error.message}`);
  }
};

if (user) {
  return <p>Welcome, {user.username}!</p>;
}

return (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      style={{width: "35%"}} 
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      style={{width: "35%"}} 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button className="logbutton" style={{float: 'right'}} type="submit">Login</button>
  </form>
);
}
