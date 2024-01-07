import React, {useEffect, useRef} from "react";
import { useFlag } from "./components/FlagContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
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
      targets: buttonRef.map((ref) => ref.current.querySelectorAll(".btn-with-padding")),
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
     // Navigate to /mode when a difficulty is selected

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
    <div>
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
            top: 5vw; /* Adjust this value to control the distance from the bottom */
            right: 3vw; /* Adjust this value to control the distance from the right */
            z-index: 999; /* Adjust the z-index to make sure the button appears above other content */
          }
        `}
      </style>
  
      <Link to="/" className="corner-button">
        <button type="button" className="btn-close" aria-label="Close"></button>
      </Link>
      
      <div className="mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row style={{ gap: "7vw", marginRight:"10vw", marginLeft: "10vw"}}>
          <Col ref={buttonRef[0]}>
            <Button
              variant="light"
              size="lg"
              onClick={() => handleDifficultyClick("Beginner")}
              className="btn-with-padding btn-with-padding"
              ref={(el) => el && el.addEventListener("mouseenter", () => handleButtonHover(el))}
              onMouseLeave={(el) => handleButtonLeave(el)}
            >
              <img src={beginnerImage} alt="Beginner" style={{ width: "70%", height: "auto" }} />
              <div style={{ fontFamily: "Arial, sans-serif", color: "#333", marginTop: "8px", fontSize: "2rem", fontWeight: "bold" }}>Beginner</div>
            </Button>
          </Col>
          <Col ref={buttonRef[1]}>
            <Button
              variant="light"
              size="lg"
              onClick={() => handleDifficultyClick("Amateur")}
              className="btn-with-padding"
              ref={(el) => el && el.addEventListener("mouseenter", () => handleButtonHover(el))}
              onMouseLeave={(el) => handleButtonLeave(el)}
            >
              <img src={amateurImage} alt="Amateur" style={{ width: "70%", height: "auto" }} />
              <div style={{ fontFamily: "Arial, sans-serif", color: "#333", marginTop: "8px", fontSize: "2rem",marginLeft: "8px", fontWeight: "bold" }}>Amateur</div>
            </Button>
          </Col>
          <Col ref={buttonRef[2]}>
            <Button
              variant="light"
              size="lg"
              onClick={() => handleDifficultyClick("Intermediate")}
              className="btn-with-padding"
              ref={(el) => el && el.addEventListener("mouseenter", () => handleButtonHover(el))}
              onMouseLeave={(el) => handleButtonLeave(el)}
            >
              <img src={intermediateImage} alt="Intermediate" style={{ width: "70%", height: "auto" }} />
              <div style={{ fontFamily: "Arial, sans-serif", color: "#333", marginTop: "8px", fontSize: "2rem", fontWeight: "bold" }}>Intermediate</div>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Difficulty;
