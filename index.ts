import Express from 'express';
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';

const MEAN_ROBOT_ACTIVE = true;

type MData = {
  sender: string;
  recipient: string;
  text: string;
  fake?: boolean;
};

const app = Express();

const port = 8080;

let user: string | null = null;
let chatHistory: MData[] = [];

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

const io = new Server({ cors: { origin: 'http://localhost:3000' } });
io.listen(app.listen(port));

function onConnection(socket: Socket) {
  socket.on('login', (newUser) => {
    user = newUser;
    userUpdate();
  });

  socket.on('logout', () => {
    user = null;
    userUpdate();
  });

  socket.on('userRequest', () => {
    userUpdate();
  });

  socket.on('send', (data: MData) => {
    addNewMessageToChat(data);
  });

  socket.on('history', (callback) => {
    callback(chatHistory);
  });
}
io.sockets.on('connection', onConnection);

console.log('Listening on port ' + port);

function userUpdate() {
  io.sockets.emit('userUpdated', user);
}

function addNewMessageToChat(data: MData) {
  io.sockets.emit('message', data);
  chatHistory.push(data);
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
