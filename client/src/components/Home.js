import React from 'react';
import { Link } from 'react-router-dom'; 
import { TbCircleNumber1Filled, TbCircleNumber2Filled, TbCircleNumber3Filled, TbUserFilled } from 'react-icons/tb';
import Footer from './Footer'; 

import './Style/HomeStyle.css'; 

const specialties = [
    { name: 'Cardiology', icon: '/Cardiology.png' },
    { name: 'Neurology', icon: '/Brain.png' },
    { name: 'Pediatrics', icon: '/Pediatrics.png' }
];

const howItWorksSteps = [
    { number: <TbCircleNumber1Filled size={65} color="#2a64b9" />, text: 'Find a Doctor' },
    { number: <TbCircleNumber2Filled size={65} color="#2a64b9" />, text: 'Book an Appointment' },
    { number: <TbCircleNumber3Filled size={65} color="#2a64b9" />, text: 'Get Well Soon' }
];

const whyChooseUsCards = [
    { icon: <TbUserFilled size={55} color="#2a64b9" />, text: 'Top Rated Doctors' },
    { icon: <TbUserFilled size={55} color="#2a64b9" />, text: '24/7 Customer Support' }
];

const HomePage = () => {
    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="hero-content">
                    <h1>Your Health, Our Priority.</h1>
                    <p>Find & Book the best doctors online with ease.</p>
                    <Link to="/appointementw" className="cta-button">Find a Doctor Now</Link>
                </div>
            </section>

            <section className="content-section">
                <h2>Our Specialties</h2>
                <div className="features-grid">
                    {specialties.map((spec) => (
                        <div key={spec.name} className="feature-card">
                            <img src={spec.icon} alt={spec.name} className="feature-icon" />
                            <h3>{spec.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className="content-section bg-light">
                <h2>How It Works</h2>
                <div className="features-grid">
                    {howItWorksSteps.map((step) => (
                        <div key={step.text} className="feature-card">
                            {step.number}
                            <h3>{step.text}</h3>
                        </div>
                    ))}
                </div>
            </section>

            <section className="content-section">
                <div className="why-us-grid">
                    <div className="why-us-text">
                        <h2>Why Choose Us?</h2>
                        <p>We provide a seamless and trusted platform to connect you with healthcare professionals who are committed to your well-being.</p>
                        <Link to="/about" className="cta-button secondary">Read More</Link>
                    </div>
                    <div className="why-us-cards">
                        {whyChooseUsCards.map((card) => (
                            <div key={card.text} className="feature-card minimal">
                                {card.icon}
                                <h3>{card.text}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default HomePage;