import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userRegister } from "../Js/userSlice/userSlice";
import './Style/RegisterStyle.css';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    isDoctor:false,
  });

  const [dateofBirth , setdateofBirth] = useState()
  const concat = {
    ...registerData , dateofBirth
  }
  
 

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(userRegister(concat));
    console.log("Submitting:", concat );
  };

  return (
    <div className="register">
      <div className="register-container">
        <div className="btn-head">
          <button className="btn-login">Login</button>
          <button className="btn-register">Register</button>
        </div>
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Name"
              value={registerData.name}
              onChange={handleChange}
            />
            <input
              className="input"
              type="text" 
              name="lastname"
              placeholder="Last Name" 
              value={registerData.lastname}
              onChange={handleChange}
            />
            <input
              className="input"
              type="email" 
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleChange}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleChange}
            />
            <input
              className="input"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={registerData.phoneNumber}
              onChange={handleChange}
            />
            <input
              className="input"
              type="date"
              name="dateofBirthBrith"
              placeholder="Date Of Birth"
              value={dateofBirth}
              onChange={(e) =>{
                setdateofBirth(e.target.value)
              }}
            />
            <br />
            <label>
              Are you a doctor?
              <input
                type="checkbox"
                name="isDoctor" 
                checked={registerData.isDoctor} 
                onChange={handleChange}
              />
            </label>

            <div className="double-btn">
              <button type="submit" className="register-btn">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="footer">
          <p>
            Already have an account? <Link to="/login">Login now</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;