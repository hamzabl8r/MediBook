import "./Style/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Js/Slice/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="logo-png" />
        </Link>
      </div>

      <div className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/doctor">Find Doctor</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </div>

      <div className="navbar-actions">
        {user ? (
          <>
            <Link to="/profil" className="profile-link">
              {user.isDoctor ? `Dr. ${user.name}`  : `Welcome, ${user.name}`}
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/auth" className="login-btn">Log In</Link>
            <Link to="/appointement" className="appointment-btn">Appointment</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;