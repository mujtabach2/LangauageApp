import React, { useRef, useEffect } from 'react';
import './Home.css'; 
import heroImg from './images/heroNew.png';
import aiImg from './images/aiImg.svg';
import speechImg from './images/speechImg.svg';
import langImg from './images/language.svg';
import { useNavigate } from 'react-router-dom';
import githubIcon from './images/github.svg';
import linkedinIcon from './images/linkedin.svg';
import anime from 'animejs/lib/anime.es.js';
import logo from './images/logo.png';

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
          easing: 'easeInOutQuad', // Easing function
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
    navigate('/flags');
  };
  const handleContactClick = () => {
    window.location.href='https://www.linkedin.com/in/mujtaba-chaudhry/';
  }

  const handleAboutClick = () => {
    const targetSection = document.getElementById('about');

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div >
      <nav style={{position: 'relative', zIndex: 1}} className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="logo" style={{ height: '6vh' }} />
          </a>
          <div className="navbar-collapse justify-content-end" style={{width: "34vw"}} >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#" style={{ fontSize: '1.4rem' }} onClick={handleAboutClick} >
                  About
                </a>
              </li>
              <li className="nav-item" style={{marginLeft: "2vw"}}>
                <a className="nav-link" href="#" style={{ fontSize: '1.4rem' }} onClick={handleContactClick}>
                  Contact
                </a>
              </li>
              <li className="nav-item" style={{marginLeft: "2vw"}}>
              <button type="button" style={{  paddingLeft: "2vw",paddingRight:'2vw', fontSize: '1.3rem', backgroundColor: '#3980d5' }} className="btn btn-primary btn-lg" onClick={handleTryNowClick}>Try Now</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    {/* Header Section */}
    <div style={{position: 'relative', zindex: 1, display: 'flex', height: '30vh', alignItems: 'center',  }}>
      {/* Left Section */}
      <div style={{ flex: '1', marginTop: '15vh', paddingLeft: '10vw' }}>
        <div style={{ width: '60%' }}>
          <h2 style={{ textAlign: 'left', color: '#1B1C57', fontSize: '2.7rem', fontFamily: 'sans-serif', fontWeight: '600', textTransform: 'capitalize', wordWrap: 'break-word' }}>
            <span className='turbocharge'>Turbocharge</span> Your Language Skills with AI Chat
          </h2>
          <p style={{ textAlign: 'left', color: '#707070', fontSize: '1.2rem', fontFamily: 'sans-serif', lineHeight: 1.5, margin: '10px 0' }}>
            Elevate your language learning journey with personalized chat-based AI tools.
          </p>
        </div>
        <div style={{ marginRight: "26vw"}}>
            <button onClick={handleTryNowClick} type="button" style={{ borderRadius: "7%",paddingLeft: "4vw", paddingRight: "4vw", marginTop: '2vw', fontSize: '1.9rem', backgroundColor: '#3980d5', fontFamily: 'sans-serif' }} className="btn btn-primary btn-lg">Try Now</button>
          </div>
      </div>


      



      {/* Right Section with Image */}
        <div className="container" style={{ flex: '1', height: '60vh' }}>
            <img src={heroImg} alt="phone" style={{ marginTop: '10vh', height: '50vh', objectFit: 'cover', paddingTop: '5vh' }} />
        </div>

      
    </div>
  <div>
    {/* Features Section */}
    <svg  xmlns="http://www.w3.org/2000/svg" width="100vw" height="60vw" viewBox="0 0 1920 928" fill="none" style={{marginTop:"20vh"}}>
      <path d="M2097.45 718.077C2238.32 772.614 2242.45 880.511 2226.9 927.643L2033.27 912.291L-19.9984 912.291L-259.625 261.38C-249.523 212.789 -192.002 121.409 -42.7306 144.618C143.859 173.629 157.32 103.788 199.958 55.7536C242.596 7.71962 301.571 -35.9369 444.97 49.7042C588.37 135.345 736.371 190.741 880.346 117.397C995.526 58.7212 1087.89 73.327 1120.92 82.1769C1153.95 91.0269 1241.24 124.56 1311.65 232.964C1399.66 368.47 1555.53 394.496 1722.54 392.029C1889.55 389.561 1918.8 456.856 1931.7 519.774C1944.61 582.692 1921.35 649.907 2097.45 718.077Z" fill="#3980d5"/>
    </svg>

      <svg id="about" xmlns="http://www.w3.org/2000/svg" width="100vw" height="60vw" viewBox="0 0 1920 678" fill="none" style={{marginTop:"-60vh"}}>
          <path d="M98.6108 465.042C-18.2377 455.489 -43.0636 394.719 -40.8705 365.529L-40.8705 0L1961.87 0V365.529C1964.06 394.719 1939.24 455.489 1822.39 465.042C1676.33 476.983 1680.28 518.779 1657.91 552.614C1635.54 586.448 1600.01 620.282 1475 593.414C1350 566.545 1227.62 557.589 1134.19 621.278C1059.45 672.228 987.102 678 960.5 678C933.898 678 861.547 672.228 786.806 621.278C693.38 557.589 571.005 566.545 445.998 593.414C320.991 620.282 285.463 586.448 263.093 552.614C240.724 518.779 244.671 476.983 98.6108 465.042Z" fill="#3980d5"/>
      </svg>


    <div className="container" style={{ marginTop: "-80vh", display: 'flex', justifyContent: 'space-around' }}>
      {/* Card 1 */}
      <div className="card" style={{ height: '20rem', width: "30%", margin: "0 1%", overflow: 'hidden' }}>
        <div className="card-body" style={{ height: "14rem", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
        <img src={speechImg} style={{ marginBottom: '1.5rem', height: "9vh"}}/>
          <h5 className="card-title" style={{ color: '#3980d5', margin: '0', textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>Fun and Immersive</h5>
          <p className="card-text" style={{ color: '#707070', fontSize: '1.2rem', lineHeight: '1.6', margin: '0', textAlign: 'center', paddingBottom:'4h'}}>
            Discover the joy of chatting with our AI, making language learning fun and immersive.
          </p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card" style={{ height: '24rem', width: "40%", margin: "0 1%", overflow: 'hidden' }}>
        <div className="card-body" style={{ height: "16rem", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
        <img src={langImg} style={{ marginBottom: '1.5rem', height: "9vh"}}/>
          <h5 className="card-title" style={{ color: '#3980d5', margin: '0', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold' }}>15+ Languages</h5>
          <p className="card-text" style={{ color: '#707070', fontSize: '1.2rem', lineHeight: '1.6', margin: '0', textAlign: 'center',paddingBottom:'4vh' }}>
            Explore the diverse range of languages available, with support for 15+ languages.
          </p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card" style={{ height: '20rem', width: "30%", margin: "0 1%", overflow: 'hidden' }}>
        <div className="card-body" style={{ height: "14rem", display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
        <img src={aiImg} style={{ marginBottom: '1.5rem', height: "9vh"}}/>
          <h5 className="card-title" style={{ color: '#3980d5', margin: '0', textAlign: 'center', fontSize: '1.8rem', fontWeight: 'bold' }}>Speech Interaction</h5>
          <p className="card-text" style={{ color: '#707070', fontSize: '1.2rem', lineHeight: '1.6', margin: '0', textAlign: 'center',paddingBottom:'4vh'}}>
            Talk to our AI using speech, enhancing your conversational language skills.
          </p>
        </div>
      </div>
    </div>
</div>

    {/* CTA Section */}


   <section className="cta-section" style={{ marginTop: '60vh', backgroundColor: '#ffffff', color: '#333', padding: '2rem 0', textAlign: 'center', position: 'relative', marginBottom: '10vh', paddingBottom: '40vh' }}>
      {/* Colorful background illustration */}

      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h3 style={{ fontSize: '2rem', margin: '0', fontWeight: 'bold' }}>Embark on an AI Adventure!</h3>
        <button
          ref={buttonRef}
          type="button"
          style={{ borderRadius: '7%', padding: '15px 30px', fontSize: '1.6rem', backgroundColor: '#3980d5', color: '#ffffff', fontWeight: 'bold', margin: '1rem 0', border: 'none' }}
          onClick={handleTryNowClick}
        >
          Get Started Now
        </button>
        <p style={{ width: "33vw",fontSize: '1.2rem', margin: '0' }}>Dive into the world of AI conversations. Start chatting with our friendly AI bot for an experience like never before!</p>
      </div>
    </section>

    

{/* Footer Section */}
      <div style={{ marginTop: '30vh',position: 'relative', zIndex: 1 }}>
          <footer className="footer" style={{ zIndex: '0', position: 'absolute', bottom: '0', left: '0', right: '0', backgroundColor: '#f8f9fa', padding: '2rem 0', textAlign: 'center' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logo} alt="Logo" style={{ height: '3vh', marginRight: '10px' }} />
                <p style={{ margin: '0', color: '#707070' }}>
                  &copy; 2023 PolyLingua. All rights reserved.
                </p>
              </div>
              <div>
                <a href="https://github.com/mujtabach2" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', color: '#3980d5' }}>
                  <img src={githubIcon} alt="GitHub" style={{ height: '2.5vh', marginRight: '5px' }} />
                </a>
                <a href="https://www.linkedin.com/in/mujtaba-chaudhry/" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '0.5rem', color: '#3980d5' }}>
                  <img src={linkedinIcon} alt="LinkedIn" style={{ height: '3.5vh', marginRight: '5px' }} />
                </a>
              </div>
            </div>
          </footer>

          </div>
 </div>



  );
};

export default Home;
