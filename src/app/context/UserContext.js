'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { ChatEvents } from '../../../common';
import { useSocket } from './SocketContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const socket = useSocket();
  const [user, setUser] = useState(null);

  useEffect(() => {
    socket.on(ChatEvents.User, setUser);
    socket.emit(ChatEvents.User, setUser);

    return () => socket.off(ChatEvents.User, setUser);
  }, []);

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
