import { io, Socket } from 'socket.io-client';

let socket: Socket;

export default function UserService() {
  if (!socket) {
    socket = io('http://localhost:8080/');
  }

  return {
    getUserList: () => {
      let { promise, resolve } = Promise.withResolvers();
      socket.emit('userList', (userList: String[]) => resolve(userList));

      return promise;
    },
  };
}
