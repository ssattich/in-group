'use client';

import { createContext, useContext, useState } from 'react';
import { io } from 'socket.io-client';

const UserContext = createContext();
let socket;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  if (!socket) {
    socket = io('http://localhost:8080/');
    socket.on('userUpdated', (user) => {
      setUser(user);
    });
  }
  socket.emit('userRequest');

  const login = (user) => {
    socket.emit('login', user);
  };
  const logout = () => {
    socket.emit('logout');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
