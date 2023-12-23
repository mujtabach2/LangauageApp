// FlagContext.js
import React, { createContext, useContext, useState } from "react";

const FlagContext = createContext();

export const FlagProvider = ({ children }) => {
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const setFlag = (flag) => {
    setSelectedFlag(flag);
  };

  const setDifficulty = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <FlagContext.Provider value={{ selectedFlag, setFlag, selectedDifficulty, setDifficulty }}>
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
