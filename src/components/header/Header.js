// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <img
        src="https://assets.cdn.filesafe.space/0ywmvQJ5n6EPQzas2upg/media/6480b0bd047a353e3c0593f8.png" // Replace with the URL of your logo image
        alt="Logo"
        style={{ width: "15%", height: "auto" }}
      />
      <div className="page-options">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

export default Header;
