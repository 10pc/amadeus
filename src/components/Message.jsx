import React from 'react';
import '../style/Amadeus.css';

const Message = ({ message }) => (
  <div className={`message ${message.sender === 'Amadeus' ? 'assistant' : 'user'}`}>
    {message.message}
  </div>
);

export default Message;
