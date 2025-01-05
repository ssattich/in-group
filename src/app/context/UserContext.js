'use client';

import { createContext, useContext, useState } from 'react';
import { io } from 'socket.io-client';
import { ChatEvents } from '../../../common';

const UserContext = createContext();
let socket;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  if (!socket) {
    socket = io('http://localhost:8080/');
    socket.on(ChatEvents.UserUpdated, (user) => {
      setUser(user);
    });
  }
  socket.emit(ChatEvents.UserRequest);

  const login = (user) => {
    socket.emit(ChatEvents.Login, user);
  };
  const logout = () => {
    socket.emit(ChatEvents.Logout);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
