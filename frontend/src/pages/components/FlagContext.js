// FlagContext.js
import React, { createContext, useContext, useState } from "react";

const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTalkingMode, setIsTalkingMode] = useState("false");

  const setFlag = (flag) => {
    setSelectedFlag(flag);
  };

  const setDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };
  const setMode = (mode) => {
    setSelectedMode(mode);
  };

  const setUsername = (username) => {
    setSelectedUsername(username);
  };

  const setTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const setTalkingMode = (talkingMode) => {
    setIsTalkingMode(talkingMode);
  };

  return (
    <FlagContext.Provider
      value={{
        selectedFlag,
        setFlag,
        selectedDifficulty,
        setDifficulty,
        selectedMode,
        setMode,
        selectedUsername,
        setUsername,
        selectedTopic,
        setTopic,
        selectedTalkingMode,
        setTalkingMode,
      }}
    >
      {children}
    </FlagContext.Provider>
  );
};

export const useFlag = () => {
  const context = useContext(FlagContext);
  if (!context) {
    throw new Error("useFlag must be used within a FlagProvider");
  }
  return context;
};
