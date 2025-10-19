import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUsers } from '../Js/Slice/userSlice';
import { addAppointement, getApp } from '../Js/Slice/appointementSlice';
import './Style/Appointement.css';
import DoctorFilters from '../components/DoctorFilters'; 
import './Style/DoctorsStyle.css'; 

const Step1DoctorCard = ({ doctor, onSelect }) => {
    
    const handleBookAppointment = () => {
        onSelect(doctor); 
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

const Step1DoctorSelection = ({ doctors, onSelectDoctor }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState(doctors); 

    useEffect(() => {
        let tempDoctors = doctors;

        if (searchTerm) {
            tempDoctors = tempDoctors.filter((doctor) =>
                doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (selectedSpecialty) {
            tempDoctors = tempDoctors.filter(
                (doctor) => doctor.specialty === selectedSpecialty
            );
        }
        if (selectedLocation) {
            tempDoctors = tempDoctors.filter(
                (doctor) => doctor.location === selectedLocation
            );
        }
        setFilteredDoctors(tempDoctors);
    }, [searchTerm, selectedSpecialty, selectedLocation, doctors]);

    const specialties = [...new Set(doctors.map((d) => d.specialty).filter(Boolean))];
    const locations = [...new Set(doctors.map((d) => d.location).filter(Boolean))];

    return (
        <div className="step-content">
            <DoctorFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedSpecialty={selectedSpecialty}
                setSelectedSpecialty={setSelectedSpecialty}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                specialties={specialties}
                locations={locations}
            />

            <div className="doctors-list">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <Step1DoctorCard 
                            key={doctor._id} 
                            doctor={doctor} 
                            onSelect={onSelectDoctor}
                        />
                    ))
                ) : (
                    <p className="no-doctors-found" style={{textAlign: 'center', marginTop: '20px'}}>
                        No doctors found matching your criteria.
                    </p>
                )}
            </div>
        </div>
    );
};


const DateTimePicker = ({ doctor, selectedDate, onSelectDate, selectedTime, onSelectTime, onNext, onBack }) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const { appointementList } = useSelector(state => state.appointements);

    const allPossibleTimes = ['09:00 AM', '10:30 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM'];

    const trulyAvailableTimes = useMemo(() => {
        if (!selectedDate) {
            return [];
        }

        let available = [...allPossibleTimes];
        const fullSelectedDate = new Date(currentYear, currentMonth, selectedDate);
        
        const bookedTimes = (appointementList || [])
            .filter(rdv => {
                const rdvDate = new Date(rdv.selectedDate);
                return rdv.doctorId === doctor._id &&
                       rdvDate.getDate() === fullSelectedDate.getDate() &&
                       rdvDate.getMonth() === fullSelectedDate.getMonth() &&
                       rdvDate.getFullYear() === fullSelectedDate.getFullYear();
            })
            .map(rdv => rdv.selectedTime);

        available = available.filter(time => !bookedTimes.includes(time));
        
        return available;

    }, [selectedDate, doctor, appointementList, currentYear, currentMonth]);

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
                        {trulyAvailableTimes.length > 0 ? (
                            trulyAvailableTimes.map(time => (
                                <span 
                                    key={time} 
                                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`} 
                                    onClick={() => onSelectTime(time)}
                                >
                                    {time}
                                </span>
                            ))
                        ) : (
                            <p>No available slots for this day.</p>
                        )}
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

const Appointment = () => {
    const { doctorId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userList, user: currentUser, status: userStatus } = useSelector((state) => state.user);
    const { status: appointmentStatus, appointementList } = useSelector((state) => state.appointements);
    const doctors = useMemo(() => userList.filter(user => user.isDoctor), [userList]);

  
    const [currentStep, setCurrentStep] = useState(doctorId ? 2 : 1);
    
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        if (userList.length === 0 && userStatus !== 'loading' && userStatus !== 'succeeded') {
            dispatch(getAllUsers());
        }
    }, [dispatch, userList.length, userStatus]);

    useEffect(() => {
        if (!appointementList && appointmentStatus !== 'loading' && appointmentStatus !== 'succeeded') {
            dispatch(getApp());
        }
    }, [dispatch, appointementList, appointmentStatus]);


    useEffect(() => {
        if (doctorId && doctors.length > 0) {
            const doctorFromUrl = doctors.find(doc => doc._id === doctorId);
            if (doctorFromUrl) {
                setSelectedDoctor(doctorFromUrl);
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
            dispatch(getApp());
        } catch (error) {
            console.error("Failed to book appointment:", error);
            alert(error.msg || "An error occurred. Please try again.");
        }
    };

    if (isConfirmed) {
        return <BookingConfirmed bookingDetails={{ doctor: selectedDoctor, date: selectedDate, time: selectedTime }} />;
    }

    if (doctorId && currentStep === 2 && !selectedDoctor && (userStatus === 'loading' || userStatus === 'idle')) {
         return (
            <div className="appointment-page">
                <div className="appointment-card">
                     <div className="step-content" style={{ textAlign: 'center', padding: '40px' }}>
                        <p>Loading doctor details...</p>
                    </div>
                </div>
            </div>
         );
    }

    return (
        <div className="appointment-page">
            <div className="appointment-card">
                <div className="appointment-header">
                    <h2>Book an Appointment</h2>
                    <div className="step-indicator">
                        <span className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Select Doctor</span>
                        <span className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Date & Time</span>
                        <span className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Confirm</span>
                    </div>
                </div>

                {currentStep === 1 && (
                    <Step1DoctorSelection
                        doctors={doctors}
                        onSelectDoctor={(doctor) => {
                            setSelectedDoctor(doctor);
                            setCurrentStep(2);
                        }}
                    />
                )}

                {currentStep === 2 && (
                    <>
                        {selectedDoctor ? (
                            <DateTimePicker
                                doctor={selectedDoctor}
                                selectedDate={selectedDate}
                                onSelectDate={setSelectedDate}
                                selectedTime={selectedTime}
                                onSelectTime={setSelectedTime}
                                onNext={() => setCurrentStep(3)}
                                onBack={() => {
                                    if (doctorId) { 
                                        navigate('/find-doctor');
                                    } else { 
                                        setCurrentStep(1);
                                    }
                                }}
                            />
                        ) : (
                            <div className="step-content" style={{ textAlign: 'center', padding: '40px' }}>
                                <p>Loading doctor details...</p>
                            </div>
                        )}
                    </>
                )}

                {currentStep === 3 && (
                     <>
                        {selectedDoctor ? (
                            <Confirmation
                                doctor={selectedDoctor}
                                date={selectedDate}
                                time={selectedTime}
                                onConfirm={handleConfirmBooking}
                                onBack={() => setCurrentStep(2)}
                                status={appointmentStatus}
                            />
                        ) : (
                             <div className="step-content" style={{ textAlign: 'center', padding: '40px' }}>
                                <p>Loading confirmation...</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Appointment;