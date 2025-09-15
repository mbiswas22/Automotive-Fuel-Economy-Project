import React, { useState } from 'react'
import { useAuth } from './AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login(){
  // toast.configure();
  // const [username, setUsername] = useState(localStorage.getItem('username') || '')
  // const [input, setInput] = useState('')
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const { login, user } = useAuth(); // Destructure login and user from useAuth()
  const navigate = useNavigate();

//   function handleLogin(e){
//     e.preventDefault()
//     if(input.trim().length>0){
//       localStorage.setItem('username', input.trim())
//       setUsername(input.trim())
//       setInput('')
//     }
//   }
//   function handleLogout(){
//     localStorage.removeItem('username')
//     setUsername('')
//   }

//   if(username){
//     return (
//       <div>
//         <h2>Welcome, {username}!</h2>
//         <button className='logbutton' onClick={handleLogout}>Logout</button>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin} className="text-xl font-semibold mb-4 items-center gap-2">
//         <input className='fullWidthInput' type="text" value={input} onChange={e=>setInput(e.target.value)} placeholder="Enter username" />
//         <button className="logbutton" style={{float: 'right'}} type="submit">Login</button>
//       </form>
//     </div>
//   )
// }

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
    // Handle login error (e.g., display error message)
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
