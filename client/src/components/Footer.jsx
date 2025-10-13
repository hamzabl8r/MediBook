import React from "react";
import { Link } from "react-router-dom";
import "./Style/FooterStyle.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-column about">
          <img src="/logo.png" alt="Logo" className="footer-logo" />
          <p>
            Providing the best healthcare services for you and your family. Book
            your appointments with ease.
          </p>
        </div>

        <div className="footer-column links">
          <h3>Quick Links</h3>
          <nav className="footer-links">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/doctor">Find Doctor</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-column contact">
          <h3>Contact Us</h3>
          <div className="contact-info">
            <p>
              <i>📍</i> Ghannouch, Gabès, Tunisia
            </p>
            <p>
              <i>📞</i> +216 12 345 678
            </p>
            <p>
              <i>✉️</i> contact@medibook.com
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 MediBook. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
