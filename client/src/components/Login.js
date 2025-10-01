import React, { useState } from "react";
import "./Style/LoginStyle.css";
import { useDispatch } from "react-redux";
import { userLogin } from "../Js/userSlice/userSlice";
import { Link, Navigate, useParams } from "react-router-dom";

const Login = () => {
  const [Log , setLog] = useState({
    email : "",
    password :""
  })
  const logo = '/logo.png'
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
      try {
        const resultLog = await dispatch(userLogin(Log))
        if(userLogin.fulfilled.match(resultLog)){
          const userId = resultLog.payload.id
          Navigate(`/current/${userId}`)
        }else{
          console.log("login failed")
        }
      } catch (error) {
        console.log(error)
      }


    };

  return (
    <div className="login">
      <div className="login-container">
        <div className="logo">
          <img src={logo} alt="" className="logo-png"/>
        </div>
        <div className="btn-head">
          <button className="btn-login">Login</button>
          <button className="btn-register">Register</button>
        </div>
        <div className="login-form">
          <form >
            <input className="input" type="mail" placeholder="Email" onChange={(e) =>setLog({...Log , email : e.target.value})}/>
            <input className="input" type="password" placeholder="Password"  onChange={(e) => setLog({...Log , password : e.target.value})}/>
            <div className="double-btn">
              <button className="login-btn" type="submit" onClick={handleSubmit()} >LOGIN</button>
              <button className="forgot-btn">Forgot Password ?</button>
            </div>
          </form>
        </div>
        <div className="login-footer">
          <p>Don't have account ? <Link to="/register">Register now</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
