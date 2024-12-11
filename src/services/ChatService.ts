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

// calling it a "service" out of Angular habit, feel free to rename and/or move
export default function ChatService(
  useBackend: boolean,
  onNewMessage: (newMessage: MData) => void
) {
  onMessage = onNewMessage;
  if (useBackend && !socket) {
    socket = io('http://localhost:8080/');
    socket.on('message', (newMessage) => onMessage(newMessage));
  }

  return {
    getChatHistory: useBackend
      ? () => {
          return []; // TODO
        }
      : () => [],
    emitMessage: useBackend
      ? (message: MData) => {
          socket.emit('send', message);
        }
      : () => {},
  };
}
