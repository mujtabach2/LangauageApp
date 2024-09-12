import React, { useEffect, useRef } from "react";
import { useFlag } from "./components/FlagContext";
import { Link, useNavigate } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";
import debateImage from "./images/debate-svgrepo-com.svg";
import conversationImage from "./images/speech-svgrepo-com (1).svg";

const Mode = () => {
  const { setMode } = useFlag();
  const navigate = useNavigate();
  const buttonRef = [useRef(null), useRef(null)];

  useEffect(() => {
    anime({
      targets: buttonRef.map((ref) =>
        ref.current.querySelectorAll(".btn-with-padding")
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
    navigate("/chatgenerator");
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
    <div className="bg-white min-h-screen flex flex-col justify-center">
      <style>
        {`
          .hovering:hover {
            transform: scale(1.05);
            opacity: 1;
            box-shadow: 0 0 0.625em rgba(0, 0, 0, 0.2);
            border-color: #f0f0f0;
            background-color: #D3D3D3;
          }
        `}
      </style>
      <Link to="/" className="absolute top-5 right-3 z-50">
        <button type="button" className="btn-close" aria-label="Close"></button>
      </Link>

      <div className="bg-white flex justify-center items-center flex-grow">
        <div className="flex flex-row gap-2 sm:gap-4 w-[95%] max-w-5xl">
          {["Conversation", "Debate"].map((mode, index) => (
            <div key={mode} className="flex-1 border rounded-xl p-2 sm:p-3 hovering" ref={buttonRef[index]}>
              <button
                onClick={() => handleModeClick(mode)}
                className="btn-with-padding w-full h-full flex flex-col items-center justify-center"
                onMouseEnter={(el) => handleButtonHover(el)}
                onMouseLeave={(el) => handleButtonLeave(el)}
              >
                <img
                  src={mode === "Conversation" ? conversationImage : debateImage}
                  alt={mode}
                  className="w-[60%] sm:w-[70%] h-auto"
                />
                <div className="font-sans text-gray-700 mt-1 sm:mt-2 text-[0.6rem] sm:text-xs md:text-sm font-bold truncate w-full text-center">
                  {mode}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
      <ul className="steps w-full mb-6 sm:mb-8">
        <li className="step step-success" data-content=""></li>
        <li className="step step-success" data-content=""></li>
        <li className="step step-success" data-content=""></li>
        <li className="step step-info" data-content="💬"></li>
      </ul>
    </div>
  );
};

export default Mode;
