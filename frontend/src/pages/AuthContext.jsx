import React, { createContext, useState, useContext } from 'react';

// Create the context with a default value
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user information

  const login = async (username, password) => {
    // Simulate an API call for login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'testuser' && password === 'password') {
          const loggedInUser = { username: 'testuser', role: 'admin' };
          setUser(loggedInUser);
          resolve(loggedInUser);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};