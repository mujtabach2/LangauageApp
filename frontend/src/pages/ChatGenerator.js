import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFlag } from "./components/FlagContext";
import logo from "./images/logo.png";
import send from "./images/send.svg";
import robotPfp from "./images/robotpfp.png";
import userPfp from "./images/userpfp.jpg";
import anime from "animejs/lib/anime.es";
import speech from "./images/speak.svg";
import mic from "./images/mic.svg";
import Finally from "./finally";
import * as dotenv from "dotenv";
dotenv.config();

const ChatGenerator = () => {
  const [input, setInput] = useState("");
  const [generatedChat, setGeneratedChat] = useState("");
  const [error, setError] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [showFinally, setShowFinally] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGenerateChat();
      setInput("");
    }
  };

  const {
    selectedFlag,
    selectedDifficulty,
    selectedMode,
    selectedTopic,
    selectedUsername,
    selectedTalkingMode,
  } = useFlag();
  const recognition = new window.webkitSpeechRecognition();
  const [translation, setTranslation] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const micButtonRef = React.createRef();

  const addMessageToChat = (role, content, translation) => {
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { role, content, translation, timestamp },
    ]);
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

  const getLanguageName = (flag) => {
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

      console.log();
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error(
        "Translation error:",
        error.response ? error.response.data : error.message,
      );
      return null;
    }
  };

  const handleGenerateChat = async () => {
    try {
      const apiUrl = "https://intelli-chat-e9vv.onrender.com/generate-chat";
      
      // Log the API URL to ensure it's correct
      console.log("API URL:", apiUrl);

      anime({
        targets: "#generateButton",
        translateY: [-10, 0], // Animation from -10px to 0px in the Y-axis
        opacity: [0, 1], // Fade in
        duration: 500,
        easing: "easeInOutQuad",
      });

      const requestBody = {
        role: "User",
        name: selectedUsername,
        session_length: "Short",
        language: getLanguageName(selectedFlag),
        proficiency: selectedDifficulty,
        topic: selectedTopic,
        mode: selectedMode,
        starter: true,
        input: input,
      };
      console.log(requestBody);
      const response = await axios.post(apiUrl, requestBody, {
        withCredentials: true,
        timeout: 10000, // Increase timeout to 10 seconds
      });
      const chatMessage =
        response.data && response.data.chat ? response.data.chat : null;
      const lang = getLanguageCode(selectedFlag);
      const translatedText = await translateText(chatMessage, lang);

      console.log(chatMessage);
      console.log(translatedText);

      setGeneratedChat(chatMessage);
      addMessageToChat("User", input);
      addMessageToChat("Generator", chatMessage, translatedText); 
      if (!selectedTalkingMode) {
        const utterance = new SpeechSynthesisUtterance(chatMessage);
        utterance.lang = lang;
        window.speechSynthesis.speak(utterance);
      }

      setInput("");
    } catch (err) {
      console.error("Error details:", err);
      let errorMessage = "An error occurred while generating the chat. Please try again.";
      
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        errorMessage = err.response.data.message || errorMessage;
      } else if (err.request) {
        console.error("No response received:", err.request);
        errorMessage = "No response received from the server. Please try again later.";
      } else {
        console.error("Error message:", err.message);
      }

      setError(errorMessage);
      addMessageToChat("Generator", errorMessage);
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
        easing: "easeInOutQuad",
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
        targets: micButtonRef.current.querySelector(".red-circle"),
        translateY: -10,
        scale: 1.1,
        duration: 300,
        easing: "easeInOutQuad",
        loop: true,
      });
    }
  };

  useEffect(() => {
    return () => {
      recognition.stop();
    };
  }, [recognition]);
  useEffect(() => {
    return () => {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.stop();
    };
  }, []);
  let lastUserMessageIndex = chatMessages.length - 1;
  console.log(chatMessages);
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {showFinally && (
        <Finally
          onClose={() => setShowFinally(false)}
          username={selectedUsername}
        />
      )}
      <div className="h-16 flex items-center justify-between bg-white px-6 shadow-md">
        <h1 className="text-xl font-semibold text-gray-800">
          <a href="/">
            <img className="h-12" src={logo} alt="Logo" />
          </a>
        </h1>
      </div>

      <div className="flex-1 overflow-auto p-6 bg-gray-100">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "User" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[70%] ${
                message.role === "User" ? "order-2" : "order-1"
              }`}
            >
              <div className="flex items-end">
                {message.role !== "User" && (
                  <img
                    src={robotPfp}
                    alt="Robot Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                <div
                  className={`rounded-lg p-3 ${
                    message.role === "User"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <p className="text-sm font-medium mb-1">
                    {message.role === "User" ? selectedUsername : "AI Assistant"}
                  </p>
                  {isTyping && message.role === "User" ? (
                    <div className="typing-indicator">
                      <p className="text-sm">Typing...</p>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}
                  {message.role !== "User" && message.translation && (
                    <p
                      className="text-xs mt-1 text-gray-600"
                      dangerouslySetInnerHTML={{ __html: message.translation }}
                    ></p>
                  )}
                </div>
                {message.role === "User" && (
                  <img
                    src={userPfp}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full ml-2"
                  />
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {message.role === "User"
                  ? "Delivered"
                  : `Seen at ${message.timestamp}`}
              </p>
              {message.role !== "User" && (
                <button
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(
                      message.content
                    );
                    utterance.lang = getLanguageCode(selectedFlag);
                    window.speechSynthesis.speak(utterance);
                  }}
                  className="mt-2 p-1 text-sm text-blue-500 hover:text-blue-600 transition-colors duration-200"
                >
                  <img src={speech} alt="Speech" className="h-4 inline mr-1" />
                  Speak
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="h-24 flex items-center bg-white px-6 shadow-md">
        <input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="flex-1 h-12 bg-gray-100 p-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type your message here..."
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button
          id="generateButton"
          onClick={handleGenerateChat}
          className="h-12 px-6 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 transition-colors duration-200"
        >
          <img src={send} alt="Send" className="h-5 inline" />
        </button>
        <button
          ref={micButtonRef}
          onClick={handleSpeechRecognition}
          className="ml-4 p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
        >
          {isListening ? (
            <div className="w-6 h-6 rounded-full bg-red-500 animate-pulse"></div>
          ) : (
            <img src={mic} alt="Speech" className="h-6" />
          )}
        </button>
      </div>
    </div>
  );
};
export default ChatGenerator;
