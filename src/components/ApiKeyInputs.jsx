import React from 'react';
import './APIKeyInput.css';
import logo from '../assets/Amadeus_logo.webp';

function APIKeyInput({
  userAPIKey,
  setUserAPIKey,
  handleSaveAPIKey,
  username,
  setUsername,
  isModalVisible,
  setIsModalVisible
}) {
  if (!isModalVisible) return null;

  const handleClearLastInnerThoughts = () => {
    localStorage.removeItem("inner_thoughts");
  };

  const handleClearAllLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div className="api-key-modal">
      <img src={logo} alt="Amadeus Logo" className='logo_settings'/>
      <div className="api-key-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveAPIKey();
            setIsModalVisible(false);
          }}
        >
          <label htmlFor="api-key">API Key:</label>
          <input
            id="api-key"
            type="password"
            value={userAPIKey}
            onChange={(e) => setUserAPIKey(e.target.value)}
            placeholder="Enter API Key"
          />
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <button type="submit">Save</button>
          {/* <button type="button" onClick={handleClearLastInnerThoughts}>Clear Last Inner Thoughts</button> */}
          <button type="button" onClick={handleClearAllLocalStorage}>Clear All Local Storage</button>
          <a href="https://www.youtube.com/watch?v=nafDyRsVnXU">Click here if you want to know how to get one</a>
          <a href="">I have a discord! Click Here to join!</a>
        </form>
      </div>
    </div>
  );
}

export default APIKeyInput;
