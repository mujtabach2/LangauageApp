import React, { useEffect, useRef } from "react";
import { useFlag } from "./components/FlagContext";
import { Link, useNavigate } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";
import debateImage from "./images/debate-svgrepo-com.svg";
import conversationImage from "./images/speech-svgrepo-com (1).svg";

const Mode = () => {
  const { setMode } = useFlag();
  const navigate = useNavigate();
  const buttonRef = [useRef(null), useRef(null)]; // Create separate refs for each button

  useEffect(() => {
    // Animation for the flags on mount
    anime({
      targets: buttonRef.map((ref) =>
        ref.current.querySelectorAll(".btn-with-padding"),
      ),
      translateY: [-20, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 800,
      delay: anime.stagger(100),
    });
  }, [buttonRef]);

  const handleModeClick = (mode) => {
    setMode(mode);
    navigate("/chatgenerator"); // Navigate to /difficulty when a mode is selected
  };

  const handleButtonHover = (buttonRef) => {
    anime({
      targets: buttonRef,
      scale: [1, 1.1],
      easing: "easeInOutQuad",
      duration: 300,
    });
  };

  const handleButtonLeave = (buttonRef) => {
    anime({
      targets: buttonRef,
      scale: [1.1, 1],
      easing: "easeInOutQuad",
      duration: 300,
    });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <style>
        {`
          .btn-with-padding {
            background-color: white;
            color: white;
            font-size: 1rem;
            border-radius: 0.5rem;
            padding: 1rem;
            font-family: sans-serif;
          }
          .corner-button {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 999;
          }
          .hovering:hover {
            transform: scale(1.05);
            opacity: 1;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            border-color: #f0f0f0;
            background-color: #D3D3D3;
          }
        `}
      </style>

      <Link to="/" className="corner-button">
        <button type="button" className="btn-close" aria-label="Close"></button>
      </Link>

      <div className="flex-grow flex justify-center items-center p-4">
        <div className="flex flex-row gap-4 w-full max-w-2xl justify-center">
          <div ref={buttonRef[0]} className="w-1/2 max-w-xs">
            <button
              onClick={() => handleModeClick("Conversation")}
              onMouseEnter={(el) => handleButtonHover(el)}
              onMouseLeave={(el) => handleButtonLeave(el)}
              className="btn-with-padding w-full h-full border-2 rounded-lg p-4 hovering flex flex-col items-center justify-center"
            >
              <img
                src={conversationImage}
                alt="Conversation"
                className="w-16 h-16 sm:w-24 sm:h-24"
              />
              <div className="font-sans text-gray-700 mt-2 text-sm sm:text-lg font-bold">
                Conversation
              </div>
            </button>
          </div>
          <div ref={buttonRef[1]} className="w-1/2 max-w-xs">
            <button
              onClick={() => handleModeClick("Debate")}
              onMouseEnter={(el) => handleButtonHover(el)}
              onMouseLeave={(el) => handleButtonLeave(el)}
              className="btn-with-padding w-full h-full border-2 rounded-lg p-4 hovering flex flex-col items-center justify-center"
            >
              <img src={debateImage} alt="Debate" className="w-16 h-16 sm:w-24 sm:h-24" />
              <div className="font-sans text-gray-700 mt-2 text-sm sm:text-lg font-bold">
                Debate
              </div>
            </button>
          </div>
        </div>
      </div>
      <ul className="steps mt-8 mb-4 px-4">
        <li className="step step-success" data-content=""></li>
        <li className="step step-success" data-content=""></li>
        <li className="step step-success" data-content=""></li>
        <li className="step step-info" data-content="💬"></li>
      </ul>
    </div>
  );
};

export default Mode;
