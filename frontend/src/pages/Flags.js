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
    <div className="bg-white min-h-screen flex flex-col justify-center">
      <style>
        {`
          .grid-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            max-width: 600px;
            margin: 0 auto;
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
            font-size: 48px;
          }
        `}
      </style>
      <Link to="/" className="absolute top-5 right-3 z-50">
        <button type="button" className="btn-close" aria-label="Close"></button>
      </Link>
      <div className="flex justify-center items-center flex-grow">
        <div className="grid-container" ref={gridRef}>
          {languages.map((language, index) => (
            <div
              key={index}
              className="grid-item"
              data-flag={language.flag}
              onClick={() => handleButtonClick(language)}
            >
              <span className="flag">{language.flag}</span>
              <br />
              <span>{language.name}</span>
            </div>
          ))}
        </div>
      </div>
      <ul className="steps w-full mb-6 sm:mb-8">
        <li className="step step-success" data-content=""></li>
        <li className="step" data-content=""></li>
        <li className="step" data-content=""></li>
        <li className="step step-info" data-content="💬"></li>
      </ul>
    </div>
  );
};

export default Flags;
