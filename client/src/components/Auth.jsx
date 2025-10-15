import { useState } from "react";
import "./Style/LoginStyle.css";
import { useDispatch } from "react-redux";
import "./Style/RegisterStyle.css";
import { userLogin, userRegister } from "../Js/Slice/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Auth = (userCurrent) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const logo = "/logo.png";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Login Logic ---
  const [log, setLog] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(userLogin(log));

      if (userLogin.fulfilled.match(resultAction)) {
        console.log("Login successful:", resultAction.payload.user);
        navigate(`/profil`);
      } else {
        const errorMessage =
          resultAction.payload?.errors[0]?.msg ||
          "Login failed! Please check your credentials.";
        console.log("Login failed:", resultAction.payload.user);
        alert(errorMessage);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  // --- Register Logic ---
  const [registerData, setRegisterData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    isDoctor: false,
    specialty: "",
    address: "",
  });

  const [dateofBirth, setdateofBirth] = useState("");

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const finalRegisterData = { ...registerData, dateofBirth };
    console.log("Submitting:", finalRegisterData);

    const resultAction = await dispatch(userRegister(finalRegisterData));

    if (userRegister.fulfilled.match(resultAction)) {
      alert("Registration successful! Please login.");
      setIsLoginView(true);
    } else {
      const errorMessage =
        resultAction.payload?.errors[0]?.msg ||
        "Registration failed. Please try again.";
      alert(errorMessage);
    }
  };

  return (
    <>
      {isLoginView ? (
        // --- Login Form ---
        <div className="login">
          <div className="login-container">
            <div className="logo">
              <img src={logo} alt="MediBook Logo" className="logo-png" />
            </div>
            <div className="btn-head">
              <button className="btn-login active">Login</button>
              <button
                className="btn-register"
                onClick={() => setIsLoginView(false)}>
                Register
              </button>
            </div>
            <div className="login-form">
              <form onSubmit={handleLogin}>
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setLog({ ...log, email: e.target.value })}
                />
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setLog({ ...log, password: e.target.value })}
                />
                <div className="double-btn">
                  <button type="submit" className="login-btn">
                    LOGIN
                  </button>
                  <Link to="/reset" className="forgot-password">
                    <button type="button" className="forgot-btn">
                      Forgot Password?
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        // --- Register Form ---
        <div className="register">
          <div className="register-container">
            <div className="btn-head">
              <button
                className="btn-login"
                onClick={() => setIsLoginView(true)}>
                Login
              </button>
              <button className="btn-register active">Register</button>
            </div>
            <div className="register-form">
              <form onSubmit={handleRegisterSubmit}>
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  className="input"
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={registerData.lastname}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  className="input"
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={registerData.phoneNumber}
                  onChange={handleRegisterChange}
                  required
                />
                <input
                  className="input"
                  type="date"
                  name="dateofBirth"
                  placeholder="Date Of Birth"
                  value={dateofBirth}
                  onChange={(e) => setdateofBirth(e.target.value)}
                  required
                />
                <br />
                <label className="checkbox-label">
                  Are you a doctor?
                  <input
                    type="checkbox"
                    name="isDoctor"
                    checked={registerData.isDoctor}
                    onChange={handleRegisterChange}
                  />
                  {registerData.isDoctor ? (
                    <div className="isDoctor">
                      <input
                        className="input"
                        type="text"
                        name="specialty"
                        placeholder="Specialty"
                        value={registerData.specialty}
                        onChange={handleRegisterChange}
                        required={registerData.isDoctor}
                      />
                      <input
                        className="input"
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={registerData.address}
                        onChange={handleRegisterChange}
                        required={registerData.isDoctor}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </label>
                <div className="double-btn">
                  <button type="submit" className="register-btn">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
