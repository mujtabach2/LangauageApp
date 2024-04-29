import React, { useRef, useEffect } from "react";
import "./Home.css";
import heroImg from "./images/heroNew.png";
import aiImg from "./images/aiImg.svg";
import speechImg from "./images/speechImg.svg";
import langImg from "./images/language.svg";
import { useNavigate } from "react-router-dom";
import githubIcon from "./images/github.svg";
import linkedinIcon from "./images/linkedin.svg";
import anime from "animejs/lib/anime.es.js";
import logo from "./images/logo.png";
import backgroundImage from "./images/backgroundLang.png";
import MyTable from "./table.js";
import Reviews from "./reviews.js";
const Home = () => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);

  useEffect(() => {
    const buttonElement = buttonRef.current;

    const handleIntersection = (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        anime({
          targets: buttonElement,
          translateY: [-10, 0], // Bouncing effect
          opacity: [0, 1], // Fade in
          duration: 1500, // Animation duration in milliseconds
          easing: "easeInOutQuad", // Easing function
          autoplay: true, // Start the animation immediately
          complete: (anim) => {
            // Disconnect the observer after the animation completes
            observer.disconnect();
          },
        });
      }
    };

    // Create an intersection observer
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5, // Trigger when at least 50% of the button is in the viewport
    });

    // Observe the button element
    observer.observe(buttonElement);

    // Cleanup observer on component unmount
    return () => observer.disconnect();
  }, []);

  const handleTryNowClick = () => {
    navigate("/flags");
  };
  const handleContactClick = () => {
    window.location.href = "https://www.linkedin.com/in/mujtaba-chaudhry/";
  };

  const handleAboutClick = () => {
    const targetSection = document.getElementById("about");

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <nav
        style={{ position: "relative", zIndex: 1 }}
        className="navbar navbar-expand-lg navbar-light bg-light"
      >
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" style={{ height: "6vh" }} />
          </a>
          <div
            className="navbar-collapse justify-content-end"
            style={{ width: "34vw" }}
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a
                  className="nav-link"
                  href="#"
                  style={{ fontSize: "1.4rem" }}
                  onClick={handleAboutClick}
                >
                  About
                </a>
              </li>
              <li className="nav-item" style={{ marginLeft: "2vw" }}>
                <a
                  className="nav-link"
                  href="#"
                  style={{ fontSize: "1.4rem" }}
                  onClick={handleContactClick}
                >
                  Contact
                </a>
              </li>
              <li className="nav-item" style={{ marginLeft: "2vw" }}>
                <button
                  type="button"
                  style={{
                    paddingLeft: "2vw",
                    paddingRight: "2vw",
                    fontSize: "1.3rem",
                    backgroundColor: "#3980d5",
                  }}
                  className="btn btn-primary btn-lg"
                  onClick={handleTryNowClick}
                >
                  Try Now
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div
        style={{
          position: "relative",
          zindex: 1,
          display: "flex",
          height: "30vh",
          alignItems: "center",
        }}
        class="mt-10"
     
      >
        {/* Left Section */}
        <div style={{ flex: "1", marginTop: "15vh", paddingLeft: "10vw" }}>
          <div style={{ width: "60%" }}>
            <h2
              style={{
                textAlign: "left",
                color: "#1B1C57",
                fontSize: "2.7rem",
                fontFamily: "sans-serif",
                fontWeight: "600",
                textTransform: "capitalize",
                wordWrap: "break-word",
              }}
            >
              <span className="turbocharge">Turbocharge</span> Your Language
              Skills with AI Chat
            </h2>
            <p
              style={{
                textAlign: "left",
                color: "#707070",
                fontSize: "1.2rem",
                fontFamily: "sans-serif",
                lineHeight: 1.5,
                margin: "10px 0",
              }}
            >
              Elevate your language learning journey with personalized
              chat-based AI tools.
            </p>
          </div>
          <div style={{ marginRight: "26vw" }}>
            <button
              onClick={handleTryNowClick}
              type="button"
              style={{
                borderRadius: "7%",
                paddingLeft: "4vw",
                paddingRight: "4vw",
                marginTop: "2vw",
                fontSize: "1.9rem",
                backgroundColor: "#3980d5",
                fontFamily: "sans-serif",
              }}
              className="btn btn-primary btn-lg"
            >
              Try Now
            </button>
          </div>
        </div>

        {/* Right Section with Image */}
        <div className="container" style={{ flex: "1", height: "60vh" }}>
          <img
            src={heroImg}
            alt="phone"
            style={{
              marginTop: "10vh",
              height: "50vh",
              objectFit: "cover",
              paddingTop: "5vh",
            }}
          />
        </div>
      </div>
      <div
        style={{ marginTop: "30vh", position: "relative", overflow: "hidden" }}
        id = "about"
      >
        {/* Features Section */}

        <img
          src={backgroundImage}
          alt="phone"
          style={{ width: "100vw", height: "auto" }}
        />

        <div
          className="containers"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "space-around",
            maxWidth: "80%",
            maxHeight: "70%",
          }}
        >
          {/* Card 1 */}
          <div
            className="card"
            style={{
              maxHeight: "60%",
              width: "30%",
              margin: "0 1%",
              overflow: "hidden",
            }}
          >
            <div
              className="card-body"
              style={{
                maxHeight: "60%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              <img
                src={speechImg}
                style={{ marginBottom: "1.5rem", height: "9vh" }}
              />
              <h5
                className="card-title"
                style={{
                  color: "#3980d5",
                  margin: "0",
                  textAlign: "center",
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                }}
              >
                Fun and Immersive
              </h5>
              <p
                className="card-text"
                style={{
                  color: "#707070",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center",
                  paddingBottom: "4h",
                }}
              >
                Discover the joy of chatting with our AI, making language
                learning fun and immersive.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="card"
            style={{
              height: "60%",
              width: "40%",
              margin: "0 1%",
              overflow: "hidden",
            }}
          >
            <div
              className="card-body"
              style={{
                maxHeight: "60%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              <img
                src={langImg}
                style={{ marginBottom: "1.5rem", height: "9vh" }}
              />
              <h5
                className="card-title"
                style={{
                  color: "#3980d5",
                  margin: "0",
                  textAlign: "center",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                15+ Languages
              </h5>
              <p
                className="card-text"
                style={{
                  color: "#707070",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center",
                  paddingBottom: "4vh",
                }}
              >
                Explore the diverse range of languages available, with support
                for 15+ languages.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="card"
            style={{
              maxHeight: "60%",
              width: "30%",
              margin: "0 1%",
              overflow: "hidden",
            }}
          >
            <div
              className="card-body"
              style={{
                maxHeight: "60%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              <img
                src={aiImg}
                style={{ marginBottom: "1.5rem", height: "9vh" }}
              />
              <h5
                className="card-title"
                style={{
                  color: "#3980d5",
                  margin: "0",
                  textAlign: "center",
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                }}
              >
                Speech Interaction
              </h5>
              <p
                className="card-text"
                style={{
                  color: "#707070",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center",
                  paddingBottom: "4vh",
                }}
              >
                Talk to our AI using speech, enhancing your conversational
                language skills.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}

      <MyTable />
      <Reviews />
      <section
        className="cta-section"
        style={{
          marginTop: "10vh",
          backgroundColor: "#ffffff",
          color: "#333",
          padding: "2rem 0",
          textAlign: "center",
          position: "relative",
          marginBottom: "10vh",
          paddingBottom: "40vh",
        }}
      >
        {/* Colorful background illustration */}

        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ fontSize: "2rem", margin: "0", fontWeight: "bold" }}>
          Let's make learning a new language interesting!
          </h3>
          <button
            ref={buttonRef}
            type="button"
            style={{
              borderRadius: "7%",
              padding: "15px 30px",
              fontSize: "1.6rem",
              backgroundColor: "#3980d5",
              color: "#ffffff",
              fontWeight: "bold",
              margin: "1rem 0",
              border: "none",
            }}
            onClick={handleTryNowClick}
          >
            Get Started Now
          </button>
          <p style={{ width: "33vw", fontSize: "1.2rem", margin: "0" }}>
            Dive into the world of AI conversations. Start chatting with our
            friendly AI bot for an experience like never before!
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <div style={{ marginTop: "10vh", position: "relative", zIndex: 1 }}>
        <footer
          className="footer"
          style={{
            zIndex: "0",
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundColor: "#f8f9fa",
            padding: "2rem 0",
            textAlign: "center",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: "3vh", marginRight: "10px" }}
              />
              <p style={{ margin: "0", color: "#707070" }}>
                &copy; 2023 PolyLingua. All rights reserved.
              </p>
            </div>
            <div>
              <a
                href="https://github.com/mujtabach2"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "0.5rem", color: "#3980d5" }}
              >
                <img
                  src={githubIcon}
                  alt="GitHub"
                  style={{ height: "2.5vh", marginRight: "5px" }}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/mujtaba-chaudhry/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginLeft: "0.5rem", color: "#3980d5" }}
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  style={{ height: "3.5vh", marginRight: "5px" }}
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
