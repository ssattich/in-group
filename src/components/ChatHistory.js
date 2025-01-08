'use client';

const ChatHistory = ({ messages, user, selectedRecipient }) => {
  return (
    <>
      {messages
        .filter(
          (msg) =>
            (msg.recipient === user || msg.sender === user) &&
            (msg.recipient === selectedRecipient ||
              msg.sender === selectedRecipient)
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
    </>
  );
};

export default ChatHistory;
