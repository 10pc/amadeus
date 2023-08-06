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
          <a href="https://www.youtube.com/watch?v=nafDyRsVnXU">Click here if you want to know how to get an Api Key</a>
          {/* <a href="">I have a discord! Click Here to join!</a> */}
        </form>


        <div class="discord-invite">
          <h5 class="discord-invite-text">You can join our discord server</h5>
          <div class="discord-invite-body">
              <div class="discord-invite-image"></div>
              <div class="discord-invite-details">
                  <h3 class="discord-invite-name">
                      <div class="discord-invite-verified">
                          <svg class="discord-invite-verified-svg" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2"><path fill="currentColor" fill-rule="evenodd" d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"></path></svg>
                          <div class="discord-invite-verified-tick">
                              <svg class="discord-invite-verified-tick-svg" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2"><path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor"></path></svg>
                          </div>
                      </div>
                      ＬＡＢＯ・ＤＥＳＵ
                  </h3>
              </div>
              <a type="button" class="discord-invite-join-button" href="https://discord.gg/32habcPdkn">
                  Join
              </a>
            </div>
        </div>
      </div>
    </div>
  );
}

export default APIKeyInput;
