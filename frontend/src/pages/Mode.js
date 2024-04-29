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
    <div className="bg-white h-[100vh]">
      <style>
        {`
          .btn-with-padding {
            background-color: white;
            color: white;
            font-size: 1.6rem;
            border-radius: 7%;
            padding-left: 4vw;
            padding-right: 4vw;
            margin-top: 15vw;
            font-family: sans-serif;
          }
          .corner-button {
            position: fixed;
            top: 5vw;
            right: 3vw;
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

      <div
        className="pt-40"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="grid grid-cols-2 gap-x-7 mx-10">
          <div class="" ref={buttonRef[0]}>
            <button
              onClick={() => handleModeClick("Conversation")}
              className="btn-with-padding"
              onMouseEnter={(el) => handleButtonHover(el)}
              onMouseLeave={(el) => handleButtonLeave(el)}
              class="border-5 rounded-2xl p-10 hovering"
            >
              <img
                src={conversationImage}
                alt="Conversation"
                className="w-70 h-auto"
              />
              <div className="font-sans text-gray-700 mt-8 text-2xl font-bold">
                Conversation
              </div>
            </button>
          </div>
          <div class="flex flex-col justify-center" ref={buttonRef[1]}>
            <button
              onClick={() => handleModeClick("Debate")}
              className="btn-with-padding"
              onMouseEnter={(el) => handleButtonHover(el)}
              onMouseLeave={(el) => handleButtonLeave(el)}
              class="border-5 rounded-2xl p-10 hovering"
            >
              <img src={debateImage} alt="Debate" className="w-70 h-auto" />
              <div className="font-sans text-gray-700 mt-8  text-2xl font-bold">
                Debate
              </div>
            </button>
          </div>
        </div>
      </div>
      <ul className="steps mt-20">
        <li className="step step-success" data-content=""></li>
        <li className="step step-success" data-content=""></li>
        <li className="step step-success" data-content=""></li>
        <li className="step step-info" data-content="💬"></li>
      </ul>
    </div>
  );
};

export default Mode;
