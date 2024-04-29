import React, { useEffect, useRef } from "react";
import { useFlag } from "./components/FlagContext";
import { Link, useNavigate } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";
import intermediateImage from "./images/intermediate.svg";
import amateurImage from "./images/amateur.svg";
import beginnerImage from "./images/beginner.svg";

const Difficulty = () => {
  const { setDifficulty } = useFlag();
  const navigate = useNavigate();
  const buttonRef = [useRef(null), useRef(null), useRef(null)]; // Create separate refs for each button

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

  const handleDifficultyClick = (difficulty) => {
    anime({
      targets: buttonRef,
      scale: [1, 1.2, 1],
      easing: "easeInOutQuad",
      duration: 500,
      complete: () => {
        setDifficulty(difficulty);
        navigate("/mode");
      },
    });
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
          .hovering:hover {
            transform: scale(1.05);
            opacity: 1;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            border-color: #f0f0f0;
            background-color: #D3D3D3;
          }
          `}
      </style>
      <Link to="/" className="fixed top-5 right-3 z-50">
        <button type="button" className="btn-close" aria-label="Close"></button>
      </Link>

      <div className="pt-[20vh] bg-white flex justify-center items-center">
        <div className="grid grid-cols-3 gap-x-7 mx-10">
          <div class="border-5 rounded-2xl p-10 hovering" ref={buttonRef[0]}>
            <button
              onClick={() => handleDifficultyClick("Beginner")}
              className="btn-with-padding"
              onMouseEnter={(el) => handleButtonHover(el)}
              onMouseLeave={(el) => handleButtonLeave(el)}
            >
              <img src={beginnerImage} alt="Beginner" className="w-70 h-auto" />
              <div className="font-sans text-gray-700 mt-8 text-2xl font-bold">
                Beginner
              </div>
            </button>
          </div>
          <div class="border-5 rounded-2xl p-10 hovering" ref={buttonRef[1]}>
            <button
              onClick={() => handleDifficultyClick("Amateur")}
              className="btn-with-padding"
              onMouseEnter={(el) => handleButtonHover(el)}
              onMouseLeave={(el) => handleButtonLeave(el)}
            >
              <img src={amateurImage} alt="Amateur" className="w-70 h-auto" />
              <div className="font-sans text-gray-700 mt-8 ml-8 text-2xl font-bold">
                Amateur
              </div>
            </button>
          </div>
          <div class="border-5 rounded-2xl p-10 hovering" ref={buttonRef[2]}>
            <button
              onClick={() => handleDifficultyClick("Intermediate")}
              className="btn-with-padding"
              onMouseEnter={(el) => handleButtonHover(el)}
              onMouseLeave={(el) => handleButtonLeave(el)}
            >
              <img
                src={intermediateImage}
                alt="Intermediate"
                className="w-70 h-auto"
              />
              <div className="font-sans text-gray-700 mt-8 text-2xl font-bold">
                Intermediate
              </div>
            </button>
          </div>
        </div>
      </div>
      <ul className="steps mt-20">
        <li className="step step-success" data-content=""></li>
        <li className="step step-success" data-content=""></li>
        <li className="step" data-content=""></li>
        <li className="step step-info" data-content="💬"></li>
      </ul>
    </div>
  );
};

export default Difficulty;
