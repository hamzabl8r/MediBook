
import React from 'react';
import './Style/AppProfilStyle.css';
import { useDispatch } from 'react-redux';
import { deleteAppointement, updateAppointement } from '../Js/Slice/appointementSlice';

const AppointmentList = ({ appointments, user }) => {
    const dispatch = useDispatch();

    const handleUpdateStatus = (appId, newStatus) => {
        dispatch(updateAppointement({ id: appId, updatedData: { status: newStatus } }));
    };

    const handleDelete = (appId) => {
        if (window.confirm("Are you sure you want to delete this appointment?")) {
            dispatch(deleteAppointement(appId));
        }
    };

    return (
        <div className="appointment-list-container">
            <h2>{user.isDoctor ? "Patient Appointments" : "My Appointments"}</h2>
            {appointments && appointments.length > 0 ? (
                <ul className="appointment-list">
                    {appointments.map((app) => (
                        <li key={app._id} className="appointment-card-item">
                            {user.isDoctor ? (
                                <p><strong>Patient:</strong> {app.patientId?.name} {app.patientId?.lastname}</p>
                            ) : (
                                <p><strong>Doctor:</strong> {app.doctorId?.name} {app.doctorId?.lastname}</p>
                            )}
                            <p><strong>Status:</strong> <span className={`status-${app.status.toLowerCase()}`}>{app.status}</span></p>
                            <p><strong>Date:</strong> {new Date(app.selectedDate).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {app.selectedTime}</p>
                            
                            <div className="appointment-actions">
                                {user.isDoctor && app.status !== "Confirmed" && (
                                    <button className="btn-confirm" onClick={() => handleUpdateStatus(app._id, "Confirmed")}>
                                        Confirm
                                    </button>
                                )}
                                <button className="btn-delete" onClick={() => handleDelete(app._id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments found.</p>
            )}
        </div>
    );
};

export default AppointmentList;