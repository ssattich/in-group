'use client';

import { useEffect, useState } from 'react';
import { useUser } from '../app/context/UserContext';
import ChatHistory from './ChatHistory';
import ChatSidebar from './ChatSidebar';
import UserService from '@/services/UserService';
import { useSocket } from '@/app/context/SocketContext';
import { ChatEvents } from '../../common';

const Chat = () => {
  const socket = useSocket();
  const { user, logout } = useUser();
  const [possibleRecipients, setPossibleRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const userService = UserService();
    (async function populateUsers() {
      const users = await userService.getUserList();
      const posRecs = users.filter((name) => name !== user);
      setPossibleRecipients(posRecs);
      setSelectedRecipient(posRecs[0]);
    })();
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && selectedRecipient) {
      const newMessage = { sender: user, recipient: selectedRecipient, text: message };
      socket.emit(ChatEvents.Send, newMessage);
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <ChatSidebar recipients={possibleRecipients} onSelectRecipient={setSelectedRecipient} />
      <div style={{ flex: 1, padding: '10px' }}>
        <span style={{ float: 'right' }}>
          Hi, {user}! |&nbsp;
          <span style={{ cursor: 'pointer' }} onClick={() => logout()}>
            Logout
          </span>
        </span>
        <h2>Chat with {selectedRecipient}</h2>
        <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '10px' }}>
          <ChatHistory selectedRecipient={selectedRecipient}></ChatHistory>
        </div>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          style={{ width: '80%', marginRight: '10px' }}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
