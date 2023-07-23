import React from 'react';
import '../style/Amadeus.css';
import Message from './Message';

function MessageList({ messages, isTyping, lastMessageRef }) {
    return (
      <div className="messageList">
        {isTyping && <div className="typingIndicator">Amadeus is typing...</div>}
        {messages.map((message, i) => (
          <div
            key={i}
            className={`message ${message.sender === 'Amadeus' ? 'assistant' : 'user'}`}
            ref={i === messages.length - 1 ? lastMessageRef : null}
          >
            {message.message}
          </div>
        ))}
      </div>
    );
  }

export default MessageList;
