'use client';

import { useUser } from '@/app/context/UserContext';
import { ChatEvents, MData } from '../../common';
import { useSocket } from '@/app/context/SocketContext';
import { useEffect, useState } from 'react';

const ChatHistory = ({ selectedRecipient }: { selectedRecipient: string }) => {
  const socket = useSocket();
  const { user } = useUser();

  const [allHistory, setAllHistory] = useState<MData[]>([]);
  const [messages, setMessages] = useState<MData[]>([]);

  useEffect(() => {
    socket.on(ChatEvents.History, setAllHistory);
    socket.emit(ChatEvents.History, setAllHistory);
    return () => socket.off(ChatEvents.History, setAllHistory);
  }, []);

  useEffect(() => {
    const filteredHistory = allHistory.filter(
      (msg) =>
        (msg.recipient === user || msg.sender === user) &&
        (msg.recipient === selectedRecipient ||
          msg.sender === selectedRecipient)
    );

    if (filteredHistory.length === messages.length) {
      if (filteredHistory.length === 0) return;
      const messageToCheck = messages[0];
      if (
        messageToCheck.recipient === selectedRecipient ||
        messageToCheck.sender === selectedRecipient
      ) {
        return;
      }
    }

    setMessages(filteredHistory);
  }, [allHistory, selectedRecipient]);

  return (
    <>
      {messages.map((msg, idx) => (
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
    </>
  );
};

export default ChatHistory;
