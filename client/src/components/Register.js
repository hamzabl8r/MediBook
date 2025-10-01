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
    
  });
  
  const [isDoctor , setIsDoctor] = useState(false)

  const handleChecked = () =>{
    setIsDoctor(!isDoctor)
  }

  const dispatch = useDispatch();

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setRegisterData({
  //     ...registerData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    dispatch(userRegister(registerData));
    console.log("Submitting:", registerData);
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
              onChange={(e) => {
                setRegisterData({...registerData,name:e.target.value})
              }}
            />
            <input
              className="input"
              type="text" 
              name="lastname"
              placeholder="Last Name" 
              value={registerData.lastname}
              onChange={(e) => {
                setRegisterData({...registerData,lastname:e.target.value})
              }}
            />
            <input
              className="input"
              type="email" 
              name="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) => {
                setRegisterData({...registerData,email:e.target.value})
              }}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) => {
                setRegisterData({...registerData,password:e.target.value})
              }}
            />
            <input
              className="input"
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={registerData.phoneNumber}
              onChange={(e) => {
                setRegisterData({...registerData,phoneNumber:e.target.value})
              }}
            />
            <input
              className="input"
              type="date"
              name="dateOfBrith"
              placeholder="Date Of Birth"
              value={registerData.dateOfBrith}
              onChange={(e) => {
                setRegisterData({...registerData,dateOfBrith:e.target.value})
              }}
            />
            <br />
            <label>
              Are you a doctor?
              <input
                type="checkbox"
                name="isDoctor" 
                checked={isDoctor} 
                onChange={handleChecked}
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