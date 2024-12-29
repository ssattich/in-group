import { io, Socket } from 'socket.io-client';

// just doing this for convenience for now
// we might wanna make a types lib for the front and back to share
type MData = {
  sender: string;
  recipient: string;
  text: string;
};

let socket: Socket;
let onMessage = (newMessage: MData) => {};
let onHistory = (history: MData[]) => {};

// calling it a "service" out of Angular habit, feel free to rename and/or move
export default function ChatService(
  useBackend: boolean,
  onNewMessage: (newMessage: MData) => void
) {
  onMessage = onNewMessage;
  if (useBackend && !socket) {
    socket = io('http://localhost:8080/');
    socket.on('message', (newMessage) => onMessage(newMessage));
    socket.on('history', (history) => onHistory(history));
  }

  return {
    getChatHistory: useBackend
      ? () => {
          let { promise, resolve } = Promise.withResolvers();
          onHistory = (history) => {
            resolve(history);
            onHistory = (history: MData[]) => {};
          };
          socket.emit('requestHistory');

          return promise;
        }
      : () => Promise.resolve([]),
    emitMessage: useBackend
      ? (message: MData) => {
          socket.emit('send', message);
        }
      : () => {},
  };
}
