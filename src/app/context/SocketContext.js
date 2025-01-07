'use client';

import { createContext, useContext, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

let firstSocket;

export const SocketProvider = ({ children }) => {
  if (!firstSocket) {
    firstSocket = io('http://localhost:8080/');
  }

  const [socket, setSocket] = useState(firstSocket);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
