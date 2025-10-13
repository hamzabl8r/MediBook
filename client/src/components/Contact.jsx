import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./Style/ContactPage.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await axios.post("http://localhost:5000/contact/send", formData);

      setStatus("succeeded");
      alert("Thank you for your message! We will get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("failed");
      console.error("Failed to send message:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again."
      );
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you. Please fill out the form below or reach
          out to us through our contact details.
        </p>
      </div>
      <div className="contact-content">
        <div className="contact-info-section">
          <h2>Get in Touch</h2>
          <p className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <span>Gabès, Tunisia</span>
          </p>
          <p className="info-item">
            <FaPhoneAlt className="info-icon" />
            <span>+216 75 000 000</span>
          </p>
          <p className="info-item">
            <FaEnvelope className="info-icon" />
            <span>contact@medibook.com</span>
          </p>
        
        </div>

        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleInputChange}
                required></textarea>
            </div>
            <button
              type="submit"
              className="submit-btn"
              disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>{" "}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
