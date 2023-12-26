import React, { useEffect, useRef } from "react";
import { useFlag } from "../components/FlagContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import anime from "animejs/lib/anime.es.js";

// placeholder images for now 
import conversationImage from "./images/logo.png";
import debateImage from "./images/logo.png";

const Mode = () => {
  const { setMode } = useFlag();
  const navigate = useNavigate();
  const buttonRef = [useRef(null), useRef(null)]; // Create separate refs for each button

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
            top: 5vw;
            right: 3vw;
            z-index: 999;
          }
        `}
      </style>

      <Link to="/" className="corner-button">
        <button type="button" className="btn-close" aria-label="Close"></button>
      </Link>

      <div className="mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Row style={{ gap: "7vw", marginRight: "10vw", marginLeft: "10vw" }}>
          <Col ref={buttonRef[0]}>
            <Button
              variant="light"
              size="lg"
              onClick={() => handleModeClick("Conversation")}
              className="btn-with-padding btn-with-padding"
              ref={(el) => el && el.addEventListener("mouseenter", () => handleButtonHover(el))}
              onMouseLeave={(el) => handleButtonLeave(el)}
            >
              <img src={conversationImage} alt="Conversation" style={{ width: "70%", height: "auto" }} />
              <div style={{ fontFamily: "Arial, sans-serif", color: "#333", marginTop: "8px", fontSize: "2rem", fontWeight: "bold" }}>Conversation</div>
            </Button>
          </Col>
          <Col ref={buttonRef[1]}>
            <Button
              variant="light"
              size="lg"
              onClick={() => handleModeClick("Debate")}
              className="btn-with-padding"
              ref={(el) => el && el.addEventListener("mouseenter", () => handleButtonHover(el))}
              onMouseLeave={(el) => handleButtonLeave(el)}
            >
              <img src={debateImage} alt="Debate" style={{ width: "70%", height: "auto" }} />
              <div style={{ fontFamily: "Arial, sans-serif", color: "#333", marginTop: "8px", fontSize: "2rem", marginLeft: "8px", fontWeight: "bold" }}>Debate</div>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Mode;
