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
      const apiUrl = "https://motionless-gray-lizard.cyclic.app/generate-chat";
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
        validateStatus: (status) =>
          (status >= 200 && status < 300) || status === 302,
        withCredentials: true,
        timeout: 3000,
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
      console.error(err);
      setError("Please fill out the form properly."); // Display error in chat
      addMessageToChat("Generator", "Please fill out the form properly."); // Add error message to chat
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
    <div className="flex flex-col h-screen">
      {showFinally && (
        <Finally
          onClose={() => setShowFinally(false)}
          username={selectedUsername}
        />
      )}
      <div className="h-10 flex items-center justify-between bg-gray-300 px-4 border-b border-gray-400">
        <h1 className="text-lg">
          <a to="/">
            <img className="h-10" src={logo} alt="Logo" />
          </a>
        </h1>
      </div>

      <div className="flex-1 overflow-auto p-4 bg-white">
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message.role === "User" ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={message.role === "User" ? userPfp : robotPfp}
                />
              </div>
            </div>
            <div className="chat-header">
              {message.role === "User" ? selectedUsername : "Robot"}
            </div>
            <div
              className={`chat-bubble ${message.role === "User" ? "bg-green-500" : "bg-blue-500"} text-white py-2 px-4 rounded-lg`}
            >
              {isTyping && message.role === "User" ? (
                <div className="typing-indicator">
                  <p className="mb-1">Typing...</p>
                </div>
              ) : (
                <p className="mb-1">{message.content}</p>
              )}
              {message.role !== "User" && (
                <p
                  className="text-xs"
                  dangerouslySetInnerHTML={{ __html: message.translation }}
                ></p>
              )}
              {message.role !== "User" && (
                <button
                  onClick={() => {
                    const utterance = new SpeechSynthesisUtterance(
                      message.content,
                    );
                    utterance.lang = getLanguageCode(selectedFlag);
                    window.speechSynthesis.speak(utterance);
                  }}
                  className="mt-2 py-1 px-2 text-sm cursor-pointer border-none rounded "
                >
                  <img src={speech} alt="Speech" className="h-4 mr-2" />
                </button>
              )}
            </div>
            <div className="chat-footer opacity-50">
              {message.role === "User"
                ? "Delivered"
                : `Seen at ${message.timestamp}`}
            </div>
          </div>
        ))}
      </div>

      <div className="h-24 flex items-center bg-gray-300 px-4 border-t border-gray-400 fixed bottom-0 w-full">
        <input
          id="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="input flex-1 h-full bg-white p-2 ml-[-2vh] rounded border border-gray-400 resize-none"
          placeholder="Type your message here..."
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <button
          id="generateButton"
          onClick={handleGenerateChat}
          className="p-2 cursor-pointer rounded-full bg-transparent hovering ml-2"
        >
          <img src={send} alt="Generate" className="h-8" />
        </button>
        <button
          ref={micButtonRef}
          onClick={handleSpeechRecognition}
          className="ml-4 p-2 cursor-pointer rounded-full bg-transparent relative hovering"
        >
          {isListening ? (
            <div
              className="w-6 h-6 rounded-full bg-red-500 animate-bounce absolute inset-0 m-auto"
              style={{ boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)" }}
            ></div>
          ) : (
            <img src={mic} alt="Speech" className="h-8" />
          )}
        </button>
      </div>
      <style>
        {`
        .hovering:hover {
          transform: scale(1.05);
          opacity: 1;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          border-color: #f0f0f0;
          background-color: #D3D3D3;
        }`}
      </style>
    </div>
  );
};
export default ChatGenerator;
