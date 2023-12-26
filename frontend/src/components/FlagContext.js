// FlagContext.js
import React, { createContext, useContext, useState } from "react";

const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedMode, setSelectedMode] = useState(null);

  const setFlag = (flag) => {
    setSelectedFlag(flag);
  };

  const setDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };
  const setMode = (mode) => {
    setSelectedMode(mode);
  };

  return (
    <FlagContext.Provider value={{ selectedFlag, setFlag, selectedDifficulty, setDifficulty, selectedMode, setMode }}>
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
