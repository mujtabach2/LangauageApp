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
  const featuresRef = useRef(null);

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

  useEffect(() => {
    const featuresElement = featuresRef.current;
    const cards = featuresElement.querySelectorAll('.feature-card');

    const handleIntersection = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        anime({
          targets: cards,
          opacity: [0, 1],
          translateY: [50, 0],
          easing: 'easeOutExpo',
          duration: 1500,
          delay: anime.stagger(300, {start: 300}),
          complete: () => {
            // Disconnect the observer after the animation completes
            observer.disconnect();
          }
        });
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1 // Trigger when at least 10% of the target is visible
    });

    if (featuresElement) {
      observer.observe(featuresElement);
    }

    return () => {
      if (featuresElement) {
        observer.unobserve(featuresElement);
      }
    };
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" style={{ height: "6vh", width: "auto", objectFit: "contain" }} />
          </a>
          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-3">
                <a className="nav-link" href="#" style={{ fontSize: "1.4rem" }} onClick={handleAboutClick}>
                  About
                </a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link" href="#" style={{ fontSize: "1.4rem" }} onClick={handleContactClick}>
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleTryNowClick}
                  type="button"
                  style={{
                    borderRadius: "30px",
                    padding: "0.5rem 1.5rem",
                    fontSize: "1.4rem",
                    backgroundColor: "#3980d5",
                    color: "#ffffff",
                    fontFamily: "sans-serif",
                    border: "none",
                    boxShadow: "0 4px 6px rgba(57, 128, 213, 0.3)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    whiteSpace: "nowrap",
                  }}
                  className="btn btn-primary try-now-button"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#2c6ab8";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 8px rgba(57, 128, 213, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#3980d5";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 6px rgba(57, 128, 213, 0.3)";
                  }}
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
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "4rem 2rem", // Increased padding
          marginBottom: "4rem", // Added margin bottom
        }}
        className="mt-10 header-section"
      >
        {/* Left Section */}
        <div className="left-section" style={{ width: "100%", maxWidth: "600px", marginBottom: "2rem" }}>
          <div>
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
          <div>
            <button
              onClick={handleTryNowClick}
              type="button"
              style={{
                borderRadius: "30px",
                padding: "1rem 2.5rem",
                marginTop: "2rem",
                fontSize: "1.6rem",
                backgroundColor: "#3980d5",
                color: "#ffffff",
                fontFamily: "sans-serif",
                border: "none",
                boxShadow: "0 4px 6px rgba(57, 128, 213, 0.3)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              className="btn btn-primary btn-lg try-now-button"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#2c6ab8";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 8px rgba(57, 128, 213, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#3980d5";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 6px rgba(57, 128, 213, 0.3)";
              }}
            >
              Try Now
            </button>
          </div>
        </div>

        {/* Right Section with Image */}
        <div className="right-section" style={{ width: "100%", maxWidth: "600px" }}>
          <img
            src={heroImg}
            alt="phone"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "50vh",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
      <div
        ref={featuresRef}
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "4rem 2rem",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          marginBottom: "4rem", // Added margin bottom
        }}
        id="about"
      >
        {/* Features Section */}
        <div
          className="features-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Card 1 */}
          <div
            className="feature-card"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              overflow: "hidden",
              opacity: 0,
              transform: "translateY(50px)",
            }}
          >
            <div
              className="card-content"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              <img
                src={speechImg}
                alt="Fun and Immersive"
                style={{ width: "64px", height: "64px", marginBottom: "1.5rem" }}
              />
              <h3
                style={{
                  color: "#3980d5",
                  margin: "0 0 1rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Fun and Immersive
              </h3>
              <p
                style={{
                  color: "#707070",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center",
                }}
              >
                Discover the joy of chatting with our AI, making language learning fun and immersive.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="feature-card"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              overflow: "hidden",
              opacity: 0,
              transform: "translateY(50px)",
            }}
          >
            <div
              className="card-content"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              <img
                src={langImg}
                alt="15+ Languages"
                style={{ width: "64px", height: "64px", marginBottom: "1.5rem" }}
              />
              <h3
                style={{
                  color: "#3980d5",
                  margin: "0 0 1rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                15+ Languages
              </h3>
              <p
                style={{
                  color: "#707070",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center",
                }}
              >
                Explore the diverse range of languages available, with support for 15+ languages.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="feature-card"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              overflow: "hidden",
              opacity: 0,
              transform: "translateY(50px)",
            }}
          >
            <div
              className="card-content"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "2rem",
              }}
            >
              <img
                src={aiImg}
                alt="Speech Interaction"
                style={{ width: "64px", height: "64px", marginBottom: "1.5rem" }}
              />
              <h3
                style={{
                  color: "#3980d5",
                  margin: "0 0 1rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                Speech Interaction
              </h3>
              <p
                style={{
                  color: "#707070",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  margin: "0",
                  textAlign: "center",
                }}
              >
                Talk to our AI using speech, enhancing your conversational language skills.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MyTable Component */}
      <div style={{ marginBottom: "4rem" }}> {/* Added wrapper with margin */}
        <MyTable />
      </div>

      {/* Reviews Component */}
      <div style={{ marginBottom: "10rem" }}> {/* Added wrapper with margin */}
        <Reviews />
      </div>

      {/* CTA Section */}
      <section
        className="cta-section"
        style={{
          backgroundColor: "#ffffff",
          color: "#333",
          padding: "4rem 0",
          textAlign: "center",
          position: "relative",
          marginBottom: "20rem", // Adjusted margin
        }}
      >
        {/* Colorful background illustration */}

        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <h3 style={{ fontSize: "2rem", margin: "0 0 1rem", fontWeight: "bold" }}>
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
          <p style={{ width: "100%", maxWidth: "33rem", fontSize: "1.2rem", margin: "1rem 0 0" }}>
            Dive into the world of AI conversations. Start chatting with our
            friendly AI bot for an experience like never before!
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <footer
          className="footer"
          style={{
            zIndex: "0",
            position: "relative", // Changed from absolute to relative
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
