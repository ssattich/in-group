'use client';

import { useEffect, useState } from 'react';
import { useUser } from '../app/context/UserContext';
import ChatService from '@/services/ChatService';
import ChatSidebar from './ChatSidebar';
import UserService from '@/services/UserService';

const Chat = () => {
  const chatService = ChatService((newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });

  const { user, logout } = useUser();
  const [possibleRecipients, setPossibleRecipients] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const userService = UserService();
    (async function populateUsers() {
      const users = await userService.getUserList();
      const posRecs = users.filter((name) => name !== user);
      setPossibleRecipients(posRecs);
      setSelectedRecipient(posRecs[0]);
    })();
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      const history = await chatService.getChatHistory();
      setMessages(history);
    };
    loadHistory();
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && selectedRecipient) {
      const newMessage = { sender: user, recipient: selectedRecipient, text: message };
      chatService.emitMessage(newMessage);
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
          {messages
            .filter(
              (msg) =>
                (msg.recipient === user || msg.sender === user) &&
                (msg.recipient === selectedRecipient || msg.sender === selectedRecipient)
            )
            .map((msg, idx) => (
              <div
                key={idx}
                style={{
                  textAlign: msg.sender === user ? 'right' : 'left',
                  margin: '5px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: msg.sender === user ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.sender !== user && (
                  <div
                    style={{
                      marginRight: '5px',
                      backgroundColor: '#eee',
                      borderRadius: '50%',
                      padding: '5px',
                    }}
                  >
                    {msg.sender.charAt(0).toUpperCase()}
                  </div>
                )}
                <div
                  style={{
                    backgroundColor: msg.sender === user ? '#d1f4d1' : '#f0f0f0',
                    padding: '8px',
                    borderRadius: '10px',
                    maxWidth: '70%',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
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
