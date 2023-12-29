import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFlag } from "../components/FlagContext";
import logo from './images/logo.png';
import send from './images/send.svg';
import robotPfp from './images/robotpfp.png';
import userPfp from './images/userpfp.jpg';
import anime from 'animejs/lib/anime.es';
import speech from "./images/speak.svg";
import mic from "./images/mic.svg";
import { googleTranslateApiKey } from './config';
import Finally from './finally';




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

  const addMessageToChat = (role, content, translation) => {
    setChatMessages((prevMessages) => [...prevMessages, {role, content, translation}]);
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
    const apiKey = googleTranslateApiKey; // Replace with your actual API key
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
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
      const apiUrl = 'https://intellichat-bh71.onrender.com/generate-chat';
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
  
      const response = await axios.post(apiUrl, requestBody);
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
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  useEffect(() => {
    // Cleanup speech recognition when component unmounts
    return () => {
      recognition.stop();
    };
  }, [recognition])
  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      const recognition = new (
        window.SpeechRecognition || window.webkitSpeechRecognition
      )();
      recognition.stop();
    };
  }, []);

  return (
    <div style={{ height: '100%', Width: '80vw', fontFamily: 'Arial, sans-serif' }}>
      {showFinally && <Finally onClose={() => setShowFinally(false)} username={selectedUsername} />}


    <div style={{ height:'10vw', backgroundColor: '#1E1E1E', padding: '10px', borderBottom: '1px solid #ddd' }}>
      <h1 style={{ margin: '0', fontSize: '1.5em', color: '#333' }}>
        <img style={{ height: '4vw' }} src={logo} alt="Logo" />
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', height: '80vw', padding: '15px', overflowY: 'auto', backgroundColor: '#1E1E1E' }}>
        {chatMessages.map((message, index) => (
          <div key={index} style={{ marginBottom: '15px', display: 'flex', flexDirection: message.role === 'User' ? 'row-reverse' : 'row' }}>
            <div style={{ marginLeft: '10px', marginRight: '10px', width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
              {message.role === 'User' ? (
                <img src={userPfp} alt="User PFP" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              ) : (
                <img src={robotPfp} alt="Robot PFP" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              )}
            </div>
            <div style={{maxWidth:"40vw",padding: '10px', borderRadius: '8px', backgroundColor: message.role === 'User' ? '#e6f7ff' : '#3980d5' }}>
              <p style={{margin: '0', color: message.role === 'User' ? 'black' : 'white' }}>{message.content}</p>
              {message.role !== 'User' && (
                <p style={{ margin: '0', fontSize: '0.7rem', color: '	#D3D3D3' }}>{message.translation}</p> 
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
                  <img src={speech} height="20vw" alt="Speech" marginRight="90vw"/>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid #ddd', padding: '15px', backgroundColor: '#1E1E1E', display: 'flex', alignItems: 'center' }}>
        <textarea
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: '1', color: 'white', backgroundColor: '#1E1E1E', minHeight: '10vw', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }}
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
          }}
        >
          <img src={mic} height="35vw" alt="Speech" />
        </button>
      </div>
    </div>

    
    
  </div>
);
};
export default ChatGenerator;