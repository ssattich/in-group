import Express from 'express';
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { ChatEvents, MData } from './common';

const MEAN_ROBOT_ACTIVE = true;

const app = Express();

const port = 8080;

let user: string | null = null;
let userList: string[] = ['Tom', 'Susan', 'Annalisa', 'Dummy Account'];
let chatHistory: MData[] = [];

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

const io = new Server({ cors: { origin: 'http://localhost:3000' } });
io.listen(app.listen(port));

function onConnection(socket: Socket) {
  socket.on(ChatEvents.Login, (newUser) => {
    if (!userList.includes(newUser)) {
      userList.push(newUser);
    }
    user = newUser;
    userUpdate();
  });

  socket.on(ChatEvents.Logout, () => {
    user = null;
    userUpdate();
  });

  socket.on(ChatEvents.User, (callback) => {
    callback(user);
  });

  socket.on(ChatEvents.Send, (data: MData) => {
    addNewMessageToChat(data);
  });

  socket.on(ChatEvents.UserList, (callback) => {
    callback(userList);
  });

  socket.on(ChatEvents.History, (callback) => {
    callback(chatHistory);
  });
}
io.sockets.on('connection', onConnection);

console.log('Listening on port ' + port);

function userUpdate() {
  io.sockets.emit(ChatEvents.User, user);
}

function addNewMessageToChat(data: MData) {
  io.sockets.emit(ChatEvents.Message, data);
  chatHistory.push(data);
  io.sockets.emit(ChatEvents.History, chatHistory);
  console.log(data);
  if (MEAN_ROBOT_ACTIVE && !data.fake) fakeReplyToMessage(data);
}

function fakeReplyToMessage(messageData: MData) {
  const reply = 'Wh*t the fuck is "' + messageData.text + '" supposed to mean?';
  const fakeMessage: MData = {
    sender: messageData.recipient,
    recipient: messageData.sender,
    text: reply,
    fake: true,
  };
  addNewMessageToChat(fakeMessage);
}
