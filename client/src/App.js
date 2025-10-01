import React, { useEffect } from "react";
import Login from "./components/Login";
// Assuming you have a Home component for the root path
// import Home from './components/Home'
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Accueil from "./components/Accueil";
import { useDispatch } from "react-redux";
import { userCurrent } from "./Js/userSlice/userSlice";
import PrivateRoute from "./components/Route/PrivateRoute";
import Otp from "./components/Otp";

const App = () => {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuth) {
      dispatch(userCurrent());
    }
  }, []);
  return (
    <>
    <Routes>

      {/* Route for the homepage */}
      {/* <Route path='/' element={<Home />} /> */}

      {/* Corrected route for the login page */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/current"
        element={
          <PrivateRoute>
            <Accueil />
          </PrivateRoute>
        }
       />
       <Route path="/verification-otp" element={<Otp />} />
    </Routes>
    
    </>
  );
};

export default App;
