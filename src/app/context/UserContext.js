'use client';

import { createContext, useContext, useState } from 'react';
import { ChatEvents } from '../../../common';
import { useSocket } from './SocketContext';

const UserContext = createContext();
let socket;

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  if (!socket) {
    socket = useSocket();
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
