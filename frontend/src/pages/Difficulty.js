// Difficulty.js
import React from "react";
import { useFlag } from "../components/FlagContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const Difficulty = () => {
  const { selectedDifficulty, setDifficulty } = useFlag();
  const navigate = useNavigate();

  const handleDifficultyClick = (difficulty) => {
    setDifficulty(difficulty);
    navigate("/mode"); // Navigate to /mode when a difficulty is selected
  };

  return (
    <div>
       <style>
        {`
          .btn-with-padding {
            padding: 50px; /* Adjust the padding as needed */
            margin-bottom: 40px; /* Optional: add margin at the bottom of each button */
            background-color: #007bff; /* Set the button color */
          }

          .btn-with-padding:hover {
            background-color: #0056b3; /* Set the button color on hover */
          }
        `}
      </style>
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: '10px', paddingTop: '6px'}}>
        <Link to="/">
        <button type="button" class="btn-close" aria-label="Close"></button>
        </Link>
    </div>


    <Container className="mt-5 text-center" >
  
      <Row>
        <Col>
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleDifficultyClick("Intermediate")}
            className="btn-with-padding"
          >
            Intermediate
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleDifficultyClick("Amateur")}
            className="btn-with-padding"
          >
            Amateur
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleDifficultyClick("Beginner")}
            className="btn-with-padding"
          >
            Beginner
          </Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Difficulty;
