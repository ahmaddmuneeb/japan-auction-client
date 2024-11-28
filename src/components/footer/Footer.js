// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <div className="footer-container">
     
     {/* <Link to="/" className="home-link">
        <img
          src="https://assets.cdn.filesafe.space/0ywmvQJ5n6EPQzas2upg/media/6480b0bd7a1ec215013542ef.png" // Replace with the URL of your home icon image
          alt="Home"
          style={{ width: '20%', height: 'auto' }}
        />
      </Link>

      <div className="social-icons">
        <a href="https://www.facebook.com/people/MakarAuto/100092001133498/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
        </a>
        <a href="https://www.instagram.com/makarauto.ca/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
      </div> */}

     
    </div>
  );
};

export default Footer;
