import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUsers } from '../Js/Slice/userSlice';
import { addAppointement } from '../Js/Slice/appointementSlice'; 
import './Style/Appointement.css';


const DoctorSelector = ({ doctors, selectedDoctor, onSelect, onNext }) => (
    <div className="step-content">
        <h3>Select a Doctor</h3>
        <div className="doctor-selection-grid">
            {doctors.map(doctor => (
                <div
                    key={doctor._id}
                    className={`doctor-option ${selectedDoctor?._id === doctor._id ? 'selected' : ''}`}
                    onClick={() => onSelect(doctor)}
                >
                    <img src={doctor.image || '/user.jpg'} alt={doctor.name} />
                    <p><strong>{doctor.name}</strong></p>
                    <p>{doctor.specialty || 'N/A'}</p>
                    <p>60 TND</p>
                </div>
            ))}
        </div>
        <button className="main-btn" onClick={onNext} disabled={!selectedDoctor}>
            Next
        </button>
    </div>
);

// Date & Time 
const DateTimePicker = ({ doctor, selectedDate, onSelectDate, selectedTime, onSelectTime, onNext, onBack }) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const availableTimes = ['09:00 AM', '10:30 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

    return (
        <div className="step-content">
            <h3>Select Date & Time</h3>
            <div className="doctor-summary-small">
                <img src={doctor.image || '/user.jpg'} alt={doctor.name} />
                <span>{doctor.name}, {doctor.specialty || 'N/A'}</span>
            </div>
            <div className="calendar-time-selection">
                <div className="calendar-grid">
                    <h4>{today.toLocaleString('default', { month: 'long' })} {currentYear}</h4>
                    <div className="calendar-days-header">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <span key={day}>{day}</span>)}
                    </div>
                    <div className="calendar-days">
                        {Array.from({ length: firstDayOfMonth }).map((_, i) => <span key={`pad-${i}`} className="empty-day"></span>)}
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                            <span
                                key={day}
                                className={`calendar-day ${day < currentDay ? 'past' : ''} ${selectedDate === day ? 'selected' : ''}`}
                                onClick={() => day >= currentDay && onSelectDate(day)}
                            >
                                {day}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="time-slots">
                    <h4>Available Times</h4>
                    <div className="time-grid">
                        {availableTimes.map(time => (
                            <span key={time} className={`time-slot ${selectedTime === time ? 'selected' : ''}`} onClick={() => onSelectTime(time)}>
                                {time}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="navigation-btns">
                <button className="secondary-btn" onClick={onBack}>Back</button>
                <button className="main-btn" onClick={onNext} disabled={!selectedDate || !selectedTime}>
                    Next
                </button>
            </div>
        </div>
    );
};

// Confirmation Step
const Confirmation = ({ doctor, date, time, onConfirm, onBack, status }) => {
    const formatDate = (day) => {
        if (!day) return '';
        const d = new Date(new Date().getFullYear(), new Date().getMonth(), day);
        return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="step-content">
            <h3>Confirm Your Appointment</h3>
            <div className="appointment-summary-final">
                <img src={doctor.image || '/user.jpg'} alt={doctor.name} className="doctor-image-large" />
                <h4>{doctor.name}</h4>
                <p>{doctor.specialty || 'N/A'}</p>
                <p>Date: <strong>{formatDate(date)}</strong></p>
                <p>Time: <strong>{time}</strong></p>
                <p>Consultation Fee: <strong>60 TND</strong></p>
            </div>
            <div className="navigation-btns">
                <button className="secondary-btn" onClick={onBack}>Back</button>
                <button className="main-btn confirm-btn" onClick={onConfirm} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Confirming...' : 'Confirm Booking'}
                </button>
            </div>
        </div>
    );
};

//  Booking Confirmed View
const BookingConfirmed = ({ bookingDetails }) => {
    const navigate = useNavigate();
    const { doctor, date, time } = bookingDetails;
    const formatDate = (day) => {
        if (!day) return '';
        const d = new Date(new Date().getFullYear(), new Date().getMonth(), day);
        return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    return (
        <div className="appointment-page confirmed">
            <div className="appointment-card confirmed-card">
                <h2>Appointment Confirmed! ✅</h2>
                <p>Thank you for booking. You can check your appointment details in your profile.</p>
                <div className="confirmed-details">
                    <img src={doctor.image || '/user.jpg'} alt={doctor.name} className="doctor-image-small" />
                    <p><strong>{doctor.name}</strong></p>
                    <p>{formatDate(date)} at {time}</p>
                </div>
                <button className="main-btn" onClick={() => navigate('/appointement')}>
                    Book Another Appointment
                </button>
            </div>
        </div>
    );
};


//  Appointment 
const Appointment = () => {
    const { doctorId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userList, user: currentUser } = useSelector((state) => state.user);
const { status: appointmentStatus, error: appointmentError } = useSelector((state) => state.appointements); 

    const doctors = useMemo(() => userList.filter(user => user.isDoctor), [userList]);

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        if (userList.length === 0) {
            dispatch(getAllUsers());
        }
    }, [dispatch, userList.length]);

    useEffect(() => {
        if (doctorId && doctors.length > 0) {
            const doctorFromUrl = doctors.find(doc => doc._id === doctorId);
            if (doctorFromUrl) {
                setSelectedDoctor(doctorFromUrl);
                setCurrentStep(2);
            }
        }
    }, [doctorId, doctors]);

    const handleConfirmBooking = async () => {
        if (!currentUser) {
            alert("Please log in to book an appointment.");
            navigate('/login');
            return;
        }

        const newAppointement = {
            doctorId: selectedDoctor._id,
            patientId: currentUser._id,
            selectedDate: new Date(new Date().getFullYear(), new Date().getMonth(), selectedDate).toISOString(),
            selectedTime: selectedTime,
            fee: 60,
        };

        try {
            await dispatch(addAppointement(newAppointement)).unwrap();
            setIsConfirmed(true);
        } catch (error) {
            console.error("Failed to book appointment:", error);
            alert(error.msg || "An error occurred. Please try again.");
        }
    };
    
    if (isConfirmed) {
        return <BookingConfirmed bookingDetails={{ doctor: selectedDoctor, date: selectedDate, time: selectedTime }} />;
    }

    return (
        <div className="appointment-page">
            <div className="appointment-card">
                <div className="appointment-header">
                    <h2>Book an Appointment</h2>
                    <div className="step-indicator">
                        <span className={`step ${currentStep === 1 ? 'active' : ''}`}>1. Doctor</span>
                        <span className={`step ${currentStep === 2 ? 'active' : ''}`}>2. Date & Time</span>
                        <span className={`step ${currentStep === 3 ? 'active' : ''}`}>3. Confirm</span>
                    </div>
                </div>

                {currentStep === 1 && (
                    <DoctorSelector 
                        doctors={doctors}
                        selectedDoctor={selectedDoctor}
                        onSelect={setSelectedDoctor}
                        onNext={() => setCurrentStep(2)}
                    />
                )}

                {currentStep === 2 && selectedDoctor && (
                     <DateTimePicker 
                        doctor={selectedDoctor}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                        selectedTime={selectedTime}
                        onSelectTime={setSelectedTime}
                        onNext={() => setCurrentStep(3)}
                        onBack={() => doctorId ? navigate('/find-doctor') : setCurrentStep(1)}
                     />
                )}

                {currentStep === 3 && selectedDoctor && (
                    <Confirmation 
                        doctor={selectedDoctor}
                        date={selectedDate}
                        time={selectedTime}
                        onConfirm={handleConfirmBooking}
                        onBack={() => setCurrentStep(2)}
                        status={appointmentStatus}
                    />
                )}
            </div>
        </div>
    );
};

export default Appointment;