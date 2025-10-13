import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getApp, getAppByDoctorId } from "../Js/Slice/appointementSlice";
import ProfilDetails from "./ProfilDetails";
import AppointmentList from "./AppointmentList";
import FindDoctorsPage from "./FindDoctorsPage";
import './Style/Appointement.css';
import "./Style/ProfilStyle.css";

const Profil = () => {
    const [activeView, setActiveView] = useState("profil"); 
    
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const { appointements: appointments, status, error } = useSelector((state) => state.appointements);

    useEffect(() => {
        if (user?._id) { 
            if (user.isDoctor) {
                dispatch(getAppByDoctorId(user._id));
            } else {
                dispatch(getApp());
            }
        }
    }, [dispatch, user]);

    if (!user) {
        return <div>Loading user profile...</div>;
    }

    if (status === "loading") {
        return <div>Loading appointments...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error?.msg || "Could not load appointments."}</div>;
    }

    const patientAppointments = user.isDoctor 
        ? appointments 
        : appointments.filter(app => app.patientId?._id === user._id);
        
    const renderActiveView = () => {
        switch (activeView) {
            case "profil":
                return <ProfilDetails user={user} />;
            case "appointments":
                return <AppointmentList appointments={patientAppointments} user={user} />;
            case "findDoctor":
                return <div className="showDoctor"><FindDoctorsPage /></div>;
            case "settings":
                return <div className="showProfil"><h1>Settings</h1><p>Settings page is under construction.</p></div>;
            default:
                return <ProfilDetails user={user} />;
        }
    };

    return (
        <div className="profil">
            <div className="profil-box">
                <div className="left">
                    <div className="profil-info">
                        <img src={user.image || "/user.jpg"} alt="profile" className="userImg" />
                        <h1>{user.isDoctor ? `Dr ${user.name}` : user.name}</h1>
                    </div>
                    <div className="links">
                        <li className={`li ${activeView === 'profil' ? 'active' : ''}`} onClick={() => setActiveView("profil")}>Profile Details</li>
                        <li className={`li ${activeView === 'appointments' ? 'active' : ''}`} onClick={() => setActiveView("appointments")}>
                            {user.isDoctor ? "Patient Appointments" : "My Appointments"}
                        </li>
                        {!user.isDoctor && (
                            <li className={`li ${activeView === 'findDoctor' ? 'active' : ''}`} onClick={() => setActiveView("findDoctor")}>Find Doctor</li>
                        )}
                        <li className={`li ${activeView === 'settings' ? 'active' : ''}`} onClick={() => setActiveView("settings")}>Settings</li>
                    </div>
                </div>
                <div className="right">
                    {renderActiveView()}
                </div>
            </div>
        </div>
    );
};

export default Profil;