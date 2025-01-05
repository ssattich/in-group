import { io, Socket } from 'socket.io-client';
import { ChatEvents } from '../../common';

let socket: Socket;

export default function UserService() {
  if (!socket) {
    socket = io('http://localhost:8080/');
  }

  return {
    getUserList: () => {
      let { promise, resolve } = Promise.withResolvers();
      socket.emit(ChatEvents.UserList, (userList: String[]) => resolve(userList));

      return promise;
    },
  };
}
