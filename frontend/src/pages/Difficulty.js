import React from "react";
import { useFlag } from "../components/FlagContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import anime from "animejs/lib/anime.es.js";

// Import your images for each difficulty level
import intermediateImage from "./images/intermediate.svg";
import amateurImage from "./images/amateur.svg";
import beginnerImage from "./images/beginner.svg";

const Difficulty = () => {
  const { setDifficulty } = useFlag();
  const navigate = useNavigate();

  const handleDifficultyClick = (difficulty) => {
    setDifficulty(difficulty);
    navigate("/mode"); // Navigate to /mode when a difficulty is selected
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
            margin-top: 2vw;
            font-family: sans-serif;
          }
        `}
      </style>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", paddingRight: "10px", marginTop: '15vw' }}>
        <Link to="/" >
          <button style={{marginTop: "=30vw"}} type="button" className="btn-close" aria-label="Close"></button>
        </Link>
      </div>
      
      <div className="mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row style={{ gap: "7vw" }}>
          <Col>
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
          <Col>
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
          <Col>
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
