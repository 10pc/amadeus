import React, { useState } from 'react';
import '../style/Amadeus.css';

const MessageInput = ({ handleSend }) => {
  const [message, setMessage] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(message);
      setMessage('');
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleInputFocus = () => {
    if (message === '') {
      setMessage('');
    }
  };

  return (
    <div className="messageInputChatting">
      <input
        type="text"
        placeholder="メッセージを入れて下さい"
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        value={message}
      />
    </div>
  );
};

export default MessageInput;
