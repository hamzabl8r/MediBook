import { useEffect, useState } from "react";
import Auth from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userCurrent } from "./Js/Slice/userSlice";
import PrivateRoute from "./components/Route/PrivateRoute";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Profil from "./components/Profil";
import Appointement from "./components/Appointement";
import FindDoctorsPage from "./components/FindDoctorsPage";
import Services from "./components/Services";
import Contact from "./components/Contact";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
const App = () => {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [ping, setping] = useState(false);
  useEffect(() => {
    if (isAuth) {
      dispatch(userCurrent());
    }
  }, [ping]);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/doctor" element={<FindDoctorsPage />} />
        <Route path="/appointement" element={<Appointement />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reset" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<PrivateRoute />}>
          <Route path="/profil" element={<Profil />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
