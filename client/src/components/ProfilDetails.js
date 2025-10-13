import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../Js/Slice/userSlice";

const ProfilDetails = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        lastname: user.lastname || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    dispatch(editUser({ id: user._id, editprofil: formData }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  };

  return (
    <div className="showProfil">
      <div className="profil-header">
        <h1 className="pr">Profile Details</h1>
        {!isEditing && (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        )}
      </div>

      <div className="Profil-Info">
        {isEditing ? (
          <div className="edit-form">
            <div className="form-group">
              <label htmlFor="name">First Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Last Name :</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number :</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-actions">
              <button
                className="save-btn"
                onClick={handleSaveChanges}
                disabled={status === "pending"}>
                {status === "pending" ? "Saving..." : "Save Changes"}
              </button>
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            </div>
            {status === "fail" && <p className="error-message">{error}</p>}
          </div>
        ) : (
          <>
            <ul className="user-info-ul">
                                 {" "}
              <li className="user-info-li">
                <strong>Full Name:</strong>{" "}
              </li>
                                 {" "}
              <li className="user-info-li">
                {user.name} {user.lastname}
              </li>
                             {" "}
            </ul>
                           {" "}
            <ul className="user-info-ul">
                                 {" "}
              <li className="user-info-li">
                <strong>Email:</strong>{" "}
              </li>
                                  <li className="user-info-li">{user.email}</li>
                             {" "}
            </ul>
                           {" "}
            <ul className="user-info-ul">
                                 {" "}
              <li className="user-info-li">
                <strong>Phone Number:</strong>{" "}
              </li>
                                 {" "}
              <li className="user-info-li">{user.phoneNumber}</li>             
               {" "}
            </ul>
                           {" "}
            <ul className="user-info-ul">
                                 {" "}
              <li className="user-info-li">
                <strong>Date of Birth:</strong>{" "}
              </li>
                                 {" "}
              <li className="user-info-li">
                {user.dateofBirth
                  ? new Date(user.dateofBirth).toLocaleDateString()
                  : "Not specified"}
              </li>
                             {" "}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilDetails;
