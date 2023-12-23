// Flags.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useFlag } from "../components/FlagContext";

const Flags = () => {
  const { setFlag } = useFlag();
  const navigate = useNavigate();

  const languages = [
    { name: "English", flag: "🇺🇸" },
    { name: "Spanish", flag: "🇪🇸" },
    { name: "French", flag: "🇫🇷" },
    { name: "German", flag: "🇩🇪" },
    { name: "Chinese", flag: "🇨🇳" },
    { name: "Japanese", flag: "🇯🇵" },
    { name: "Korean", flag: "🇰🇷" },
    { name: "Russian", flag: "🇷🇺" },
    { name: "Italian", flag: "🇮🇹" },
    { name: "Portuguese", flag: "🇵🇹" },
    { name: "Dutch", flag: "🇳🇱" },
    { name: "Arabic", flag: "🇸🇦" },
  ];

  const handleButtonClick = (language) => {
    setFlag(language.flag);
    navigate("/difficulty");


    // Change the page to "/difficulty" or perform other actions
    
  };

  return (
    <div>
      <style>
        {`
          .grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 120px);
            gap: 10px;
          }
          .grid-item {
            background-color: white;
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
          }
          .flag {
            font-size: 36px; /* Adjust the font size as needed */
          }
        `}
      </style>
      <div className="grid-container">
        {languages.map((language, index) => (
          <div
            key={index}
            className="grid-item"
            onClick={() => {
              handleButtonClick(language);
            }}
          >
            <span className="flag">{language.flag}</span>
            <br />
            <span>{language.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flags;
