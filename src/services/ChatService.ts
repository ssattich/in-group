import { io, Socket } from 'socket.io-client';
import { MData } from '../../common';

let socket: Socket;
let onMessage = (newMessage: MData) => {};

// calling it a "service" out of Angular habit, feel free to rename and/or move
export default function ChatService(onNewMessage: (newMessage: MData) => void) {
  onMessage = onNewMessage;
  if (!socket) {
    socket = io('http://localhost:8080/');
    socket.on('message', (newMessage) => onMessage(newMessage));
  }

  return {
    getChatHistory: () => {
      let { promise, resolve } = Promise.withResolvers();
      socket.emit('history', (history: MData[]) => resolve(history));
      return promise;
    },
    emitMessage: (message: MData) => {
      socket.emit('send', message);
    },
  };
}
