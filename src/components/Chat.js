'use client';

import { useEffect, useState } from 'react';
import { useUser } from '../app/context/UserContext';
import ChatService from '@/services/ChatService';
import ChatSidebar from './ChatSidebar';
import { appUsers } from '../Variables';

const Chat = () => {
  const USE_BACKEND = true;
  const chatService = ChatService(USE_BACKEND, (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  });

  const { user } = useUser();
  const possibleRecipients = appUsers.filter((name) => name !== user);
  const [selectedRecipient, setSelectedRecipient] = useState(possibleRecipients[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

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
        <h2>Chat with {selectedRecipient}</h2>
        <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '10px' }}>
          {messages
            .filter((msg) => msg.recipient === selectedRecipient || msg.sender === selectedRecipient)
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
                  <div style={{ marginRight: '5px', backgroundColor: '#eee', borderRadius: '50%', padding: '5px' }}>
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
