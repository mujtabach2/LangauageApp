import React, { useEffect, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useFlag } from "./components/FlagContext";
import { useNavigate } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";
import Switch from "react-switch";
import logo from "./images/logo.png";
import setShowFinally from "./ChatGenerator";

const Finally = ({ onClose, username }) => {
    const { setUsername, setTopic, setTalkingMode } = useFlag();
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const [localUsername, setLocalUsername] = useState("");
    const [localTopic, setLocalTopic] = useState("");



    
  

    useEffect(() => {
      anime({
        targets: "#finallyCard",
        opacity: [0, 1],
        translateY: [20, 0],
        easing: "easeInOutQuad",
        duration: 800,
        delay: 200,
      });
    }, []);
  
    const handleStartChat = () => {
        // Set user details and talking mode
        setUsername(localUsername);
        setTopic(localTopic);
        
    
        // Close the Finally component
        onClose();
      };
      // Pass name as a JSON string
        
    
    const handleSwitchChange = (checked) => {
        console.log("Switch changed:", checked);
        setIsSwitchChecked(checked);
        setTalkingMode();
      };
  return (
    <div
    className="d-flex justify-content-center align-items-center vh-100"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.5)", zIndex: 9999}}
      onClick={onClose}
    >

    <Card id="finallyCard" style={{ width: "400px" }} onClick={(e) => e.stopPropagation()}>
        <Card.Header>
          <img src={logo} alt="logo" style={{ height: "5vw" }} />
        </Card.Header>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>Final Step</Card.Title>
          <Form>
            <Form.Group controlId="userName">
              <Form.Control
                type="text"
                placeholder="Enter your name"
                onChange={(e) => setLocalUsername(e.target.value)}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="topic">
              <Form.Control
                type="text"
                placeholder="Enter the topic you want to talk about"
                onChange={(e) => setLocalTopic(e.target.value)}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="isTalkingMode">
              <Form.Label>Talking Mode</Form.Label>
              <div style={{ marginTop: "10px" }}>
                <Switch onChange={handleSwitchChange} checked={isSwitchChecked} />
              </div>
            </Form.Group>

            <Button variant="primary" type="button" onClick={handleStartChat} block>
              Start Chat
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>

  );
};

export default Finally;
