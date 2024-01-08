import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFlag } from "./components/FlagContext";
import logo from './images/logo.png';
import send from './images/send.svg';
import robotPfp from './images/robotpfp.png';
import userPfp from './images/userpfp.jpg';
import anime from 'animejs/lib/anime.es';
import speech from "./images/speak.svg";
import mic from "./images/mic.svg";
import Finally from './finally';
import * as dotenv from "dotenv";
dotenv.config();

const ChatGenerator = () => {
  const [input, setInput] = useState('');
  const [generatedChat, setGeneratedChat] = useState('');
  const [error, setError] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [showFinally, setShowFinally] = useState(true);

  const handleShowFinally = () => {
    setShowFinally(true);
  };

  const { selectedFlag, selectedDifficulty, selectedMode, selectedTopic, selectedUsername,selectedTalkingMode } = useFlag();
  const recognition = new window.webkitSpeechRecognition()
  const [translation, setTranslation] = useState(null); 
  const [isListening, setIsListening] = useState(false); 
  const micButtonRef = React.createRef();

  const addMessageToChat = (role, content, translation) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatMessages((prevMessages) => [...prevMessages, {role, content, translation, timestamp}]);
  };

  const getLanguageCode = (flag) => {
    // Define mappings for each flag to language code
    const languageMappings = {
      "🇺🇸": "en-US", // English
      "🇪🇸": "es-ES", // Spanish
      "🇫🇷": "fr-FR", // French
      "🇩🇪": "de-DE", // German
      "🇨🇳": "zh-CN", // Chinese
      "🇯🇵": "ja-JP", // Japanese
      "🇰🇷": "ko-KR", // Korean
      "🇷🇺": "ru-RU", // Russian
      "🇮🇹": "it-IT", // Italian
      "🇵🇹": "pt-PT", // Portuguese
      "🇳🇱": "nl-NL", // Dutch
      "🇸🇦": "ar-SA", // Arabic
    };
  
    // Default to English if the flag is not found
    return languageMappings[flag];
  };

  const getLanguageName = (flag) => 
  {
    const languageMappings = {
    "🇺🇸": "English", // English
    "🇪🇸": "Spanish", // Spanish
    "🇫🇷": "French", // French
    "🇩🇪": "German", // German
    "🇨🇳": "Chinese", // Chinese
    "🇯🇵": "Japanese", // Japanese
    "🇰🇷": "Korean", // Korean
    "🇷🇺": "Russian", // Russian
    "🇮🇹": "Italian", // Italian
    "🇵🇹": "Portuguese", // Portuguese
    "🇳🇱": "Dutch", // Dutch
    "🇸🇦": "Arabic", // Arabic
  };

  return languageMappings[flag];
  };


  const translateText = async (text, targetLanguage) => {
    const apiKeys = process.env.GOOGLE_API_KEY; // Replace with your actual API key
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKeys}`;
  
    try {
      const response = await axios.post(apiUrl, {
        q: text,
        source: targetLanguage, // Assuming the source language is English
        target: "en",
      });
  
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error('Translation error:', error.response ? error.response.data : error.message);
      return null;
    }
  };
  
  const handleGenerateChat = async () => {
    try {
      const apiUrl = 'https://ill-kerchief-lion.cyclic.app/generate-chat';
      anime({
        targets: '#generateButton',
        translateY: [-10, 0], // Animation from -10px to 0px in the Y-axis
        opacity: [0, 1], // Fade in
        duration: 500,
        easing: 'easeInOutQuad',
      });
  
      const requestBody = {
        role: 'User',
        name: selectedUsername,
        session_length: 'Short',
        language: getLanguageName(selectedFlag),
        proficiency: selectedDifficulty,
        topic: selectedTopic,
        mode: selectedMode,
        starter: true,
        input: input,
      };
      console.log(requestBody);
      const response = await axios.post(apiUrl, requestBody,{ validateStatus: status => status >= 200 && status < 300 || status === 302,});
      const chatMessage = response.data && response.data.chat ? response.data.chat : null;
      const lang = getLanguageCode(selectedFlag);
      const translatedText = await translateText(chatMessage, lang);
  
      console.log(chatMessage);
      console.log(translatedText);
  
      setGeneratedChat(chatMessage);
      addMessageToChat('User', input);
      addMessageToChat('Generator', chatMessage, translatedText);
      if (!selectedTalkingMode) {
        const utterance = new SpeechSynthesisUtterance(chatMessage);
        utterance.lang = lang;
        window.speechSynthesis.speak(utterance);
      }
  
      
      setInput('');
    } catch (err) {
      console.error(err);
      setError('Please fill out the form properly.'); // Display error in chat
      addMessageToChat('Generator', 'Please fill out the form properly.'); // Add error message to chat
    }
  };
  

 

  const handleSpeechRecognition = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);

      // Reset mic button animation
      anime({
        targets: micButtonRef.current,
        translateY: 0,
        scale: 1,
        duration: 300,
        easing: 'easeInOutQuad',
      });
    } else {
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.start();
      setIsListening(true);

      // Start mic button animation
      anime({
        targets: micButtonRef.current.querySelector('.red-circle'),
        translateY: -10,
        scale: 1.1,
        duration: 300,
        easing: 'easeInOutQuad',
        loop: true,
      });
    }
  };

  useEffect(() => {
    return () => {
      recognition.stop();
    };
  }, [recognition])
  useEffect(() => {
    return () => {
      const recognition = new (
        window.SpeechRecognition || window.webkitSpeechRecognition
      )();
      recognition.stop();
    };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' }}>
    {showFinally && <Finally onClose={() => setShowFinally(false)} username={selectedUsername} />}
    {/* // header */}
    <div style={{ width: '100vw', height: '10vh', backgroundColor: '#DFDFDF', padding: '10px', borderBottom: '1px solid #ddd' }}>
      <h1 style={{ fontSize: '1.5em', color: '#333' }}>
        <a href="/" >
           <img style={{ height: '4vw' }} src={logo} alt="Logo" />
        </a>
      </h1>

      {/* chat messages */}
      <div style={{ width: '100vw', flex: '1', display: 'flex', flexDirection: 'column', padding: '15px', overflowY: 'auto', backgroundColor: 'white', paddingBottom: '5vh' }}>
        {chatMessages.map((message, index) => (
          <div key={index} style={{ marginBottom: '15px', display: 'flex', flexDirection: message.role === 'User' ? 'row-reverse' : 'row' }}>
            <div style={{ marginLeft: '1.25vw', marginRight: '1.25vw', width: '5vw', height: '5vw', borderRadius: '50%', overflow: 'hidden' }}>
              {message.role === 'User' ? (
                <img src={userPfp} alt="User PFP" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                <img src={robotPfp} alt="Robot PFP" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              )}
            </div>
            <div style={{maxWidth:"40vw",padding: '10px', borderRadius: '8px', backgroundColor: message.role === 'User' ? '#53d769' : '#3980d5' }}>
              <p style={{margin: '0', color: 'white' }}>{message.content}</p>
              {message.role !== 'User' && (
                <p style={{ margin: '0', fontSize: '0.7rem', color: '#D3D3D3' }} dangerouslySetInnerHTML={{ __html: message.translation }}></p> 
              )}
              {message.role !== 'User' && (
                <button
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(message.content);
                    utterance.lang = getLanguageCode(selectedFlag);
                    window.speechSynthesis.speak(utterance);
                  }}
                  style={{
                    marginTop: '5px',
                    padding: '5px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#3980d5',
                    color: 'white',
                  }}
                >
                  <img src={speech} height="18vw" alt="Speech" marginRight="90vw"/>
                </button>
              )}
              {message.role === 'User' ? (
                <p style={{ margin: '0', fontSize: '0.7rem', color: '#DFDFDF', textAlign: message.role === 'User' ? 'left' : 'right' }}>{message.timestamp}</p>
              ):(
                <p style={{ margin: '0', fontSize: '0.7rem', color: '#DFDFDF', textAlign: message.role === 'User' ? 'left' : 'right' }}>{message.timestamp}</p>
              )}
            </div>
          </div>
        ))}
      </div>
       {/* input box and generate button */}
       <div style={{ width: '100vw', height: '10vh', borderTop: '1px solid #ddd', padding: '15px', backgroundColor: '#DFDFDF', display: 'flex', alignItems: 'center', position: 'fixed', bottom: 0 , zIndex: 1}}>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: '1', color: 'black', backgroundColor: 'white', Height: '10vw', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }}
        />
        <button
          id="generateButton"
          onClick={handleGenerateChat}
          style={{
            padding: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: 'transparent',
          }}
        >
          <img src={send} color="white" height="35vw" alt="Generate" />
        </button>
        <button
          ref={micButtonRef}
          onClick={handleSpeechRecognition}
          style={{
            marginLeft: '10px',
            padding: '10px',
            fontSize: '16px',
            cursor: 'pointer',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: 'transparent',
            color: 'white',
            position: 'relative',  
          }}
        >
          {isListening ? (
            <div
              className="red-circle"
              style={{
                width: '2.5vw', height: '2.5vw',  
                borderRadius: '50%',
                backgroundColor: 'red',
                animation: 'bounce 1s infinite', 
                boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.5)',
              }}
            ></div>
          ) : (
            <img src={mic} color="black" height="35vw" alt="Speech" />
          )}
      </button>
      </div>
    </div>
  </div>
);
};
export default ChatGenerator;