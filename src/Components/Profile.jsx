import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import { FaArrowLeft, FaUser, FaVenusMars, FaPhone, FaIdCard, FaPassport, FaCar, FaMapMarkerAlt } from 'react-icons/fa';
import { BsCalendarDateFill } from "react-icons/bs";

const Profile = () => {
  const navigate = useNavigate();
  const [driver, setDriver] = useState(null);

  // Function to format the date to a more readable format
  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  useEffect(() => {
    const fetchDriverProfile = async () => {
      try {
        // Get the driver ID from localStorage
        const driverId = localStorage.getItem('driverId');
        
        if (driverId) {
          // Fetch driver details using the ID
          const response = await axios.get(`http://localhost:5000/api/driver/${driverId}`);
          setDriver(response.data.driver);
        } else {
          console.error('Driver ID not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching driver profile:', error);
      }
    };

    fetchDriverProfile();
  }, []);

  const handleBackButtonClick = () => {
    navigate('/home'); 
  };

  if (!driver) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <FaArrowLeft className="back-icon" onClick={handleBackButtonClick}/>
        <img 
          src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1725302479/IMG_20220923_220919_zjzuye.jpg" 
          alt="Profile"
          className="profile-pic"
        />
        <h2>{driver.driverName}</h2>
        <p className="username">{driver.driverId}</p>
        <div className="profile-stats">
          <div>
            <span>{driver.rating}</span>
            <p>★</p>
          </div>
          <div>
            <span>{driver.trips}</span>
            <p>Trips</p>
          </div>
          <div>
            <span>{driver.time}</span>
            <p>Time</p>
          </div>
          <div>
            <p>Experience</p>
            <span>{driver.experience}</span>
          </div>
          <div>
            <span>{driver.distance}</span>
            <p>Distance</p>
          </div>
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-info-item">
          <FaUser className="profile-icon" />
          <div>
            <p className="label">Full Name</p>
            <span className="value">{driver.driverName}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaVenusMars className="profile-icon" />
          <div>
            <p className="label">Gender</p>
            <span className="value">{driver.gender}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaPhone className="profile-icon" />
          <div>
            <p className="label">Phone Number</p>
            <span className="value">{driver.contact}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaIdCard className="profile-icon" />
          <div>
            <p className="label">Aadhar Card Number</p>
            <span className="value">{driver.aadhar}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaPassport className="profile-icon" />
          <div>
            <p className="label">License Number</p>
            <span className="value">{driver.licenceNumber}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaCar className="profile-icon" />
          <div>
            <p className="label">Vehicle Type</p>
            <span className="value">{driver.vehicleType}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaMapMarkerAlt className="profile-icon" />
          <div>
            <p className="label">Address</p>
            <span className="value">{driver.address}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <BsCalendarDateFill className="profile-icon" />
          <div>
            <p className="label">Date of Birth</p>
            <span className="value">{formatDate(driver.dob)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
