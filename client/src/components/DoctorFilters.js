import React from "react";

const DoctorFilters = ({
  searchTerm,
  setSearchTerm,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedLocation,
  setSelectedLocation,
  specialties,
  locations,
}) => {
  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search by doctor name..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="filter-select"
        value={selectedSpecialty}
        onChange={(e) => setSelectedSpecialty(e.target.value)}
      >
        <option value="">All Specialties</option>
        {specialties.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>
      <select
        className="filter-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="">All Locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DoctorFilters;