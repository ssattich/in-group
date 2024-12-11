import React from 'react';

const ChatSidebar = ({ recipients, onSelectRecipient }) => {
  return (
    <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
      <h3>Chats</h3>
      {recipients.map((name) => (
        <div
          key={name}
          style={{ cursor: 'pointer', padding: '5px' }}
          onClick={() => onSelectRecipient(name)}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default ChatSidebar;
