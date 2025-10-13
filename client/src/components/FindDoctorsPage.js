
import { React, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../Js/Slice/userSlice";

import DoctorFilters from "../components/DoctorFilters"; 
import DoctorList from "../components/DoctorList"; 

import "./Style/DoctorsStyle.css";

const FindDoctorsPage = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.user.userList);
  const status = useSelector((state) => state.user.status);

  const doctors = useMemo(() => {
    return userList.filter((user) => user.isDoctor === true);
  }, [userList]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    if (userList.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, userList.length]);

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

  if (status === "pending" && doctors.length === 0) {
    return <div className="loading-message">Loading doctors...</div>;
  }

  const specialties = [...new Set(doctors.map((d) => d.specialty).filter(Boolean))];
  const locations = [...new Set(doctors.map((d) => d.location).filter(Boolean))];

  return (
    <div className="find-doctors-page">
      <h1 className="page-title">Find Your Doctor</h1>

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

      <DoctorList doctors={filteredDoctors} />
    </div>
  );
};

export default FindDoctorsPage;