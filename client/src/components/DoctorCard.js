import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate(`/appointement`);
  };

  return (
    <div className="doctor-card">
      <img
        src={doctor.image || "/user.jpg"}
        alt={doctor.name}
        className="doctor-image"
      />
      <div className="doctor-info">
        <h3 className="doctor-name">{doctor.name}</h3>
        <p className="doctor-specialty">{doctor.specialty || "N/A"}</p>
        <p className="doctor-location">{doctor.location || "N/A"}</p>
        <p className="doctor-phone">{doctor.phoneNumber || "N/A"}</p>
        <div className="doctor-rating">⭐ {doctor.rating || "N/A"}</div>
        <p className="doctor-fee">Consultation Fee: 60 TND</p>
        <button
          className="book-appointment-btn available"
          onClick={handleBookAppointment}
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;