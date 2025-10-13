import React from 'react';
import './Style/Services.css'; 
import { useNavigate } from "react-router-dom";

import { FaHeart, FaBaby, FaStethoscope, FaBone } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { MdOutlineCleanHands } from "react-icons/md"; 

const servicesData = [
    {
        id: 's1',
        name: 'Cardiology',
        description: 'Comprehensive heart care, diagnostics, and treatment for cardiovascular conditions.',
        icon: <FaHeart color='#AED6F1' size={30}/>, 
        image: 'https://via.placeholder.com/600x400/AED6F1/FFFFFF?text=Cardiology+Care'
    },
    {
        id: 's2',
        name: 'Neurology',
        description: 'Specialized care for disorders affecting the brain, spinal cord, and nervous system.',
        icon: <GiBrain color='#D2B4DE' size={30}/>, 
        image: 'https://via.placeholder.com/600x400/D2B4DE/FFFFFF?text=Neurology+Services'
    },
    {
        id: 's3',
        name: 'Pediatrics',
        description: 'Dedicated healthcare services for infants, children, and adolescents.',
        icon: <FaBaby color='#A2D9CE' size={30}/>, 
        image: 'https://via.placeholder.com/600x400/A2D9CE/FFFFFF?text=Pediatric+Health'
    },
    {
        id: 's4',
        name: 'General Medicine',
        description: 'Primary care and general health consultations for common illnesses and preventative health.',
        icon: <FaStethoscope color='#FCF3CF' size={30}/>, 
        image: 'https://via.placeholder.com/600x400/FCF3CF/FFFFFF?text=General+Consultation'
    },
    {
        id: 's5',
        name: 'Dermatology',
        description: 'Expert care for skin, hair, and nail conditions, including cosmetic procedures.',
        icon: <MdOutlineCleanHands color='#FADBD8' size={30}/>, 
        image: 'https://via.placeholder.com/600x400/FADBD8/FFFFFF?text=Dermatology+Clinic'
    },
    {
        id: 's6',
        name: 'Orthopedics',
        description: 'Diagnosis and treatment of musculoskeletal system injuries and diseases.',
        icon: <FaBone color='#D6EAF8' size={30}/>, 
        image: 'https://via.placeholder.com/600x400/D6EAF8/FFFFFF?text=Orthopedic+Care'
    },
];



const Services = () => {
    const navigate = useNavigate();

    return (
        <div className="services-page">
            {/* Hero Section */}
            <div className="services-hero">
                <div className="hero-content">
                    <h1>Our Comprehensive Healthcare Services</h1>
                    <p>Connecting you with expert care across a wide range of medical specialties. Find the right doctor for your needs.</p>
                    <button className="hero-btn" onClick={() => navigate('/doctor')}>
                        Find a Doctor Now
                    </button>
                </div>
            </div>

            {/* Services Grid */}
            <div className="services-grid-container">
                <h2 className="section-title">Explore Our Specialties</h2>
                <div className="services-grid">
                    {servicesData.map(service => (
                        <div key={service.id} className="service-card">
                            <div className="service-icon">
                                {service.icon}
                            </div>
                            <h3>{service.name}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="services-cta">
                <h2 className="cta-title">Ready to Book Your Appointment?</h2>
                <p className="cta-description">Take the first step towards better health today.</p>
                <button className="main-cta-btn" onClick={() => navigate('/appointment')}>
                    Book an Appointment
                </button>
            </div>
        </div>
    );
};

export default Services;