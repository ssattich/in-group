import { io, Socket } from 'socket.io-client';
import { ChatEvents, MData } from '../../common';

let socket: Socket;
let onMessage = (newMessage: MData) => {};

// calling it a "service" out of Angular habit, feel free to rename and/or move
export default function ChatService(onNewMessage: (newMessage: MData) => void) {
  onMessage = onNewMessage;
  if (!socket) {
    socket = io('http://localhost:8080/');
    socket.on(ChatEvents.Message, (newMessage) => onMessage(newMessage));
  }

  return {
    getChatHistory: () => {
      let { promise, resolve } = Promise.withResolvers();
      socket.emit(ChatEvents.History, (history: MData[]) => resolve(history));
      return promise;
    },
    emitMessage: (message: MData) => {
      socket.emit(ChatEvents.Send, message);
    },
  };
}
