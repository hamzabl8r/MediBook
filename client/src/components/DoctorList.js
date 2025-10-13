import React from "react";
import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors }) => {
  if (doctors.length === 0) {
    return (
      <p className="no-doctors-found">
        No doctors found matching your criteria.
      </p>
    );
  }

  return (
    <div className="doctors-list">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor._id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;