import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaHistory, FaUser, FaPhoneAlt, FaExclamationTriangle, FaHome, FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate('/');
  };

  const notify = (message) => {
    toast.success(message, {
      // position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, 
    });
  };

  const handleHelplineClick = () => {
    
    notify('Message sent to the admin team');
  };

  const handleSOSClick = () => {
    notify('SOS alert sent to the admin team');
  };

  return (
    <div className="main-ctn">
      <div className="map-view">
        <img src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1725507873/Product-Selector_okdnkh.png" alt="Map Placeholder" className="map" />
      </div>

      <div className="no-trips-container">
        <p className="no-trips-text"><FaCar className="icon" />Welcome Driver</p>
        <p className="sub-text">Please navigate to the assigned trips to check your drives.</p>
      </div>

      <div className="navigation-container">
        <Link to="/assigned-trips" className="nav-item"><FaCar size={24} /><p>Assigned Trips</p></Link>
        <Link to="/trip-history" className="nav-item"><FaHistory size={24} /><p>Trip History</p></Link>
        <Link to="/profile" className="nav-item"><FaUser size={24} /><p>Profile</p></Link>
      </div>

      <div className="bottom-actions">
        <button className="helpline-button" onClick={handleHelplineClick}>
          <FaPhoneAlt /> Helpline
        </button>
        <button className="sos-button" onClick={handleSOSClick}>
          <FaExclamationTriangle /> SOS
        </button>
      </div>

      <div className="footer">
        <p>You are Online</p>
      </div>
      <div className="footer-icons">
        <FaHome className="home-icon" />
        <FaSignOutAlt className="settings-icon" onClick={handleBackButtonClick} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
