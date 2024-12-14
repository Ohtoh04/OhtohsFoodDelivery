import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:3000/profile", {
        credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        setUser(data.profile);
        console.log("user_response_success");
    } else {
        setUser(null);
        console.log("user_response_fail");
    }

  };

  useEffect(() => {
      fetchUserData();
  }, []);

  const logout = () => {
    setUser(null);
    axios.post('http:/localhost:3000/logout');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
