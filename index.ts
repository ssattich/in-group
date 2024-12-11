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

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

const io = new Server({ cors: { origin: 'http://localhost:3000' } });
io.listen(app.listen(port));

function onConnection(socket: Socket) {
  const message: MData = {
    sender: 'InGroup',
    recipient: 'group',
    text: 'Welcome! This is the start of the chat.',
  };
  socket.emit('message', message);

  socket.on('send', (data: MData) => {
    io.sockets.emit('message', data);
    console.log(data);
    if (MEAN_ROBOT_ACTIVE && !data.fake) fakeReplyToMessage(data);
  });
}
io.sockets.on('connection', onConnection);

console.log('Listening on port ' + port);

function fakeReplyToMessage(messageData: MData) {
  const reply = 'Wh*t the fuck is "' + messageData.text + '" supposed to mean?';
  const fakeMessage: MData = {
    sender: messageData.recipient,
    recipient: messageData.sender,
    text: reply,
    fake: true,
  };
  io.sockets.emit('message', fakeMessage);
}
