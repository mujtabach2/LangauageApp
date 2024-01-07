import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFlag } from "./components/FlagContext";
import anime from "animejs/lib/anime.es.js";
import { Link } from "react-router-dom";

const Flags = () => {
  const { setFlag } = useFlag();
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    // Animation for the flags on mount
    anime({
      targets: gridRef.current.querySelectorAll(".grid-item"),
      translateY: [-20, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 800,
      delay: anime.stagger(100),
    });
  }, []);

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
    // Animation for the selected flag
    anime({
      targets: `.grid-item[data-flag='${language.flag}']`,
      scale: [1, 1.2, 1],
      easing: "easeInOutQuad",
      duration: 500,
      complete: () => {
        setFlag(language.flag);
        navigate("/difficulty");
      },
    });
  };

  return (
    <div>
      <style>
        {`
          .grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(4, 150px); /* Adjust the flag height as needed */
            gap: 20px;
          }
          .grid-item {
            background-color: white;
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
            border-radius: 8px;
            cursor: pointer;
            opacity: 0;
            transition: transform 0.3s, box-shadow 0.3s;
          }
          .grid-item:hover {
            transform: scale(1.1);
            box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
          }
          .flag {
            font-size: 48px; /* Adjust the font size as needed */
          }
          .corner-button {
            position: fixed;
            top: 5vw; /* Adjust this value to control the distance from the bottom */
            right: 3vw; /* Adjust this value to control the distance from the right */
            z-index: 999; /* Adjust the z-index to make sure the button appears above other content */
          }
        `}
      </style>
      <Link to="/" className="corner-button">
        <button type="button" class="btn-close" aria-label="Close"></button>
       </Link>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      
      <div className="grid-container" ref={gridRef}>
        {languages.map((language, index) => (
          <div
            key={index}
            className="grid-item"
            data-flag={language.flag}
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
    </div>
  );
};

export default Flags;
