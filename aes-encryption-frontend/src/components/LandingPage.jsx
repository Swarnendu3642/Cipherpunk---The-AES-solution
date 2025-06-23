import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/LandingPage.css';
import encryptIcon from "../assets/encrypt.png";
import decryptIcon from "../assets/decrypt.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className='top-section'>
        <nav>
          <h1>Cipherpunk</h1>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <header>
          <h2>Protect Your Files with AES</h2>
          <p>
            Experience secure and lightning-fast AES encryption and decryption directly from your browser.
            Privacy made powerful.
          </p>
        </header>
      </div>

      <div className="icon-container">
        <div className="icon-box" onClick={() => navigate("/encrypt")}>
          <img src={encryptIcon} alt="Encrypt" />
          <span>Encrypt</span>
        </div>
        <div className="icon-box" onClick={() => navigate("/decrypt")}>
          <img src={decryptIcon} alt="Decrypt" />
          <span>Decrypt</span>
        </div>
      </div>

      <section id="about">
          <h2>About AES Encryption</h2>
          <p>
              AES (Advanced Encryption Standard) is a highly secure and efficient algorithm used worldwide for data protection. It supports 128-, 192-, and 256-bit keys and encrypts data in 128-bit blocks. Trusted by governments, banks, and tech giants, AES helps ensure your sensitive information stays safe from intrusions. Our tool leverages AES for seamless file encryption and decryption.
          </p>
      </section>

      <section id="contact">
          <h2>Contact Us</h2>
          <p>Email: contact@srcipherpunk.com</p>
          <p>Phone: +91-74394-08636</p>
          <p>Got questions or feedback? Reach out and let’s secure the digital world together.</p>
      </section>


      <footer>
        &copy; 2025 Cipherpunk. All rights reserved.
      </footer>
    </div>
  );
}

export default LandingPage;
