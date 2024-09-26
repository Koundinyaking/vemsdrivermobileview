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
          const response = await axios.get(`http://localhost:5000/driver/driver/${driverId}`);
          setDriver(response.data.driver[0]);
        } else {
          console.error('Driver ID not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching driver profile:', error);
      }
    };

    
    fetchDriverProfile();
  }, []);
  console.log(driver)
  
  const handleBackButtonClick = () => {
    navigate('/home'); 
  };

  if (!driver) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <FaArrowLeft className="back-icon" onClick={handleBackButtonClick}/>
        <img 
          src={driver.DriverImage}
          alt="Profile"
          className="profile-pic"
        />
        <h2>{driver.driverName}</h2>
        <p className="username">{driver.DriverName}</p>
        <div className="profile-stats">
          {/* <div>
            <span>{driver.rating}</span>
            <p>★</p>
          </div> */}
          <div>
            <p>Driver Id</p>
            <span>{driver.DriverId}</span>
          </div>
          <div>
            <p>Trips</p>
            <span>{driver.DriverTrips}</span>
          </div>
          <div>
            <p>Experience</p>
            <span>{driver.DriverExperience}</span>
          </div>
          <div>
            <p>Date of Joining</p>
            <span>{driver.DriverAddedDate}</span>
          </div>
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-info-item">
          <FaUser className="profile-icon" />
          <div>
            <p className="label">Full Name</p>
            <span className="value">{driver.DriverName}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaVenusMars className="profile-icon" />
          <div>
            <p className="label">Gender</p>
            <span className="value">{driver.DriverGender}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaPhone style={{
                fontSize: '17px',
                transform: 'scaleX(-1)',
            }} className="profile-icon" />
          <div>
            <p className="label">Phone Number</p>
            <span className="value">{driver.DriverPhone}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaIdCard className="profile-icon" />
          <div>
            <p className="label">Aadhar Card Number</p>
            <span className="value">{driver.DriverAadhar}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaPassport className="profile-icon" />
          <div>
            <p className="label">License Number</p>
            <span className="value">{driver.DriverLicense}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaCar className="profile-icon" />
          <div>
            <p className="label">Vehicle Number</p>
            <span className="value">{driver.VehicleNumber}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaCar className="profile-icon" />
          <div>
            <p className="label">Vehicle Type</p>
            <span className="value">{driver.VehicleType}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaMapMarkerAlt className="profile-icon" />
          <div>
            <p className="label">Address</p>
            <span className="value">{driver.DriverAddress}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <BsCalendarDateFill className="profile-icon" />
          <div>
            <p className="label">Date of Birth</p>
            <span className="value">{formatDate(driver.DriverDOB)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
