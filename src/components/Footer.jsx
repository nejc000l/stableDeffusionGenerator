import React from 'react';
import '../styles/Fotter.css'
const Footer = () => {
  return (
    <footer>
          <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/terms">Terms of Service</a>
      <a href="/privacy">Privacy Policy</a>
      {/* add more links as needed */}
      <p>Copyright © 2023 Your Company</p>
    </footer>
  );
};

export default Footer;