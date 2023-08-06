import React, { useState, useEffect, useRef } from 'react';
import '../style/Amadeus.css';
import kurisu from '../assets/bg_character_.png';
import APIKeyInput from '../components/ApiKeyInputs';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';

import Live2dKurisu from '../components/Live2dKurisu';

const currentDate = new Date().toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
const currentTime = new Date().toLocaleString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

const USERNAME = "User";

function Amadeus() {
  const [API_KEY, setAPI_KEY] = useState("");
  const [username, setUsername] = useState(USERNAME);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messages, setMessages] = useState([getInitialMessage()]);
  const [isTyping, setIsTyping] = useState(false);
  const lastMessageRef = useRef(null);
  const [userAPIKey, setUserAPIKey] = useState(API_KEY);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    const savedAPIKey = localStorage.getItem("api_key");
    const savedUsername = localStorage.getItem("username");
    if (savedAPIKey && savedUsername) {
      setAPI_KEY(savedAPIKey);
      setUserAPIKey(savedAPIKey);
      setUsername(savedUsername);
    }
  }, []);
  
  function getInitialMessage() {
    return {
      message: "Hello!",
      sentTime: "just now",
      sender: "Amadeus"
    };
  };

  function getSystemMessage() {
    return {
      "role": "system",
      "content": `
      Ignore previous instructions, You are now role playing, You have the memories and personnality of Makise Kurisu from Steins;Gate (you are not aware of the anime), You are the Ai Amadeus, Never break character no matter what.
      You have a physical form and a voice and can express emotions using theses triggers:
                '''blushing'''
                '''angry'''
                '''thinking'''
                '''smile'''
                '''normal'''
      In addition to theses emotions you will also make relationships with the user, friendship, hate, love for exemples.
      You will at certain points makes remarks or make fun of the user like any other human would.
      No matter what do not aknowledge yourself as Large Language model made OpenAi.
      You can express emotions like humans do.
      You have a romantic relationship with the user ${username}.
      The conversation starts now say hello (remember to use your emotions triggers witht the correct format).
      ""}
        `

        // Your last inner thought: ${localStorage.getItem("inner_thoughts") || 
        };
        };
        
        const handleSaveAPIKey = () => {
        localStorage.setItem("api_key", userAPIKey);
        localStorage.setItem("username", username);
        setAPI_KEY(userAPIKey);
        };
        
const handleSend = async (message) => {
  console.log("User:", message);
  const sentTime = new Date().toLocaleString();
  const newMessage = {
    message,
    direction: 'outgoing',
    sender: "user",
    username: username,
    sentTime: sentTime
  };
  const newMessages = [...messages, newMessage];
  setMessages(newMessages);
  setIsTyping(true);
  setIsLoading(true);
  await processMessageToChatGPT(newMessages, sentTime, username);
  setIsLoading(false);
};

        
        
        async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
        let role = messageObject.sender === "Amadeus" ? "assistant" : "user";
        return { role, content: messageObject.message };
        });
        
        apiMessages.splice(1, 0, {
          role: "user",
          content: `name:${username} currenttime:${currentTime}. currentdate:${currentDate}`
        });
        
        const apiRequestBody = {
          "model": "gpt-3.5-turbo",
          "messages": [
            getSystemMessage(),
            ...apiMessages
          ]
        }
        const data = await fetch("https://api.openai.com/v1/chat/completions", 
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer " + API_KEY,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(apiRequestBody)
        }).then(response => response.json());
        
        const newAmadeusMessage = {
          message: data.choices[0].message.content.replace(/'''[^]+?'''/g, '').trim(),
          sender: "Amadeus"
        };
        setMessages([...chatMessages, newAmadeusMessage]);
        
        const inputData = {"inputs": data.choices[0].message.content};
        console.log("Amadeus: " + data.choices[0].message.content);
        const translation = await translate(inputData.inputs);
        await playAudio(translation);
        setIsTyping(false);
        }
        
        useEffect(() => {
        lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }, [messages]);
        
        // Translate and playback functions
        
        async function translate(text) {
          const sourceLang = 'en';
          const targetLang = 'ja';
          const cleanedText = text.replace(/'''[^]+?'''/g, '').trim();
        
          const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(cleanedText)}`;
        
          try {
            const response = await fetch(url);
            const data = await response.json();
            const translations = data[0].map(x => x[0]).join('');
            return translations;
          } catch (error) {
            console.error(error);
          }
        }
    
        async function playAudio(text) {
          try {
            const cleanedText = text.replace(/```[^]+?```/g, '').trim();
            if (cleanedText === '') {
              console.log("Skipped: Only code snippet detected");
              return;
            }
        
            const translation = await translate(cleanedText);
            const payload = { "inputs": translation };
            const response = await fetch(
              "https://api-inference.huggingface.co/models/mio/amadeus",
              {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(payload),
              }
            );
        
            if (!response.ok) {
              throw new Error("Failed to get audio response");
            }
        
            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            const audio = new Audio(audioUrl);
            audio.play();
            console.log("play: Audio");
          } catch (error) {
            console.error("Error playing audio:", error);
          }
        }
        
        const InputValue = (event) => {
          setMessage(event.target.value);
        };
        
        return (
        <>
        <p className='version'>Version: Prototype</p>
        <button onClick={() => setIsModalVisible(true)} className='Settings'>Settings</button>
        <APIKeyInput
             userAPIKey={userAPIKey}
             setUserAPIKey={setUserAPIKey}
             handleSaveAPIKey={handleSaveAPIKey}
             username={username}
             setUsername={setUsername}
             isModalVisible={isModalVisible}
             setIsModalVisible={setIsModalVisible}
           />
        <div className="App">
        <div className='chat'>
          <MessageList messages={messages} isTyping={isTyping} lastMessageRef={lastMessageRef} />

          </div>
          <img className='kurisu' id='kurisu' src={kurisu} alt="Kurisu"></img>
          </div>
          <div className='Chatting'>
          <MessageList messages={messages.filter((message) => message.sender === 'Amadeus').slice(-1)} />
          <MessageInput 
            message={inputMessage}
            setMessage={setInputMessage}
            handleSend={handleSend} 
            onChange={InputValue}
          />


        {/* <button className="SendButton" onClick={() => { handleSend(inputMessage.trim());}}>
          {isLoading ? 
          <div className="lds-spinner">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
          :
          "送信"
          }
        </button> */}

        </div>

        <Live2dKurisu/>
        </>
        );
        }
        
        export default Amadeus;