// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Profile.css';
// import { FaArrowLeft, FaUser, FaVenusMars, FaPhone, FaIdCard, FaPassport, FaCar, FaMapMarkerAlt, } from 'react-icons/fa';
// import { BsCalendarDateFill } from "react-icons/bs";

// const Profile = () => {
//   const navigate =useNavigate();

//   const handleBackButtonClick = () => {
//     navigate('/home'); 
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         <FaArrowLeft className="back-icon" onClick={handleBackButtonClick}/>
//         <img 
//           src="https://res.cloudinary.com/dlo7urgnj/image/upload/v1725302479/IMG_20220923_220919_zjzuye.jpg" 
//           alt="Profile"
//           className="profile-pic"
//         />
//         <h2>Driver Ravi</h2>
//         <p className="username">NOTDR1234</p>
//         <div className="profile-stats">
//           <div>
//             <span>4.5</span>
//             <p>★</p>
//           </div>
//           <div>
//             <span>200</span>
//             <p>Trips</p>
//           </div>
//           <div>
//             <span>20 Hrs</span>
//             <p>Time</p>
//           </div>
//           <div>
//             <span>2 Years</span>
//             <p>Experience</p>
//           </div>
//           <div>
//             <span>30 Km</span>
//             <p>Distance</p>
//           </div>
//         </div>
//       </div>
//       <div className="profile-info">
//         <div className="profile-info-item">
//           <FaUser className="profile-icon" />
//           <div>
//             <p className="label">Full Name</p>
//             <span className="value">Driver Ravi</span>
//           </div>
//         </div>
//         <div className="profile-info-item">
//           <FaVenusMars className="profile-icon" />
//           <div>
//             <p className="label">Gender</p>
//             <span className="value">Male</span>
//           </div>
//         </div>
//         <div className="profile-info-item">
//           <FaPhone className="profile-icon" />
//           <div>
//             <p className="label">Phone Number</p>
//             <span className="value">9876543210</span>
//           </div>
//         </div>
//         <div className="profile-info-item">
//           <BsCalendarDateFill className="profile-icon" />
//           <div>
//             <p className="label">DOB</p>
//             <span className="value">13/9/2002</span>
//           </div>
//         </div>
//         <div className="profile-info-item">
//           <FaIdCard className="profile-icon" />
//           <div>
//             <p className="label">Aadhar ID Number</p>
//             <span className="value">1234 5678 9012</span>
//           </div>
//         </div>
//         <div className="profile-info-item">
//           <FaIdCard className="profile-icon" />
//           <div>
//             <p className="label">Driver Id</p>
//             <span className="value">1234 5678 9012</span>
//           </div>
//         </div>
//         <div className="profile-info-item">
//           <FaPassport className="profile-icon" />
//           <div>
//             <p className="label">PAN Number</p>
//             <span className="value">ABCDE1234Z</span>
//           </div>
//         </div>
//         <div className="profile-info-item">
//           <FaCar className="profile-icon" />
//           <div>
//             <p className="label">License Number</p>
//             <span className="value">TN00123345859034</span>
//           </div>
//         </div>
//         <div className="profile-info-item">
//           <FaMapMarkerAlt className="profile-icon" />
//           <div>
//             <p className="label">Address</p>
//             <span className="value">44/25, 2nd Floor, Tambaram Street, Chennai, India</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { FaArrowLeft, FaUser, FaVenusMars, FaPhone, FaIdCard, FaPassport, FaCar, FaMapMarkerAlt, } from 'react-icons/fa';
import { BsCalendarDateFill } from "react-icons/bs";

const Profile = () => {
  const navigate = useNavigate();

  // State to store profile data
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the profile data from backend API
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('https://your-api-endpoint.com/api/profile'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []); // Empty dependency array means this effect runs once on mount.

  const handleBackButtonClick = () => {
    navigate('/home');
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render the profile if data is available
  return (
    <div className="profile-container">
      <div className="profile-header">
        <FaArrowLeft className="back-icon" onClick={handleBackButtonClick} />
        <img
          src={profile.profilePictureUrl || "https://via.placeholder.com/150"} 
          alt="Profile"
          className="profile-pic"
        />
        <h2>{profile.fullName || 'Driver Ravi'}</h2>
        <p className="username">{profile.driverId || 'NOTDR1234'}</p>
        <div className="profile-stats">
          <div>
            <span>{profile.rating || '4.5'}</span>
            <p>★</p>
          </div>
          <div>
            <span>{profile.trips || '200'}</span>
            <p>Trips</p>
          </div>
          <div>
            <span>{profile.time || '20 Hrs'}</span>
            <p>Time</p>
          </div>
          <div>
            <span>{profile.experience || '2 Years'}</span>
            <p>Experience</p>
          </div>
          <div>
            <span>{profile.distance || '30 Km'}</span>
            <p>Distance</p>
          </div>
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-info-item">
          <FaUser className="profile-icon" />
          <div>
            <p className="label">Full Name</p>
            <span className="value">{profile.fullName || 'Driver Ravi'}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaVenusMars className="profile-icon" />
          <div>
            <p className="label">Gender</p>
            <span className="value">{profile.gender || 'Male'}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaPhone className="profile-icon" />
          <div>
            <p className="label">Phone Number</p>
            <span className="value">{profile.phoneNumber || '9876543210'}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <BsCalendarDateFill className="profile-icon" />
          <div>
            <p className="label">DOB</p>
            <span className="value">{profile.dob || '13/9/2002'}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaIdCard className="profile-icon" />
          <div>
            <p className="label">Aadhar ID Number</p>
            <span className="value">{profile.aadharId || '1234 5678 9012'}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaIdCard className="profile-icon" />
          <div>
            <p className="label">Driver Id</p>
            <span className="value">{profile.driverId || '1234 5678 9012'}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaPassport className="profile-icon" />
          <div>
            <p className="label">PAN Number</p>
            <span className="value">{profile.panNumber || 'ABCDE1234Z'}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaCar className="profile-icon" />
          <div>
            <p className="label">License Number</p>
            <span className="value">{profile.licenseNumber || 'TN00123345859034'}</span>
          </div>
        </div>
        <div className="profile-info-item">
          <FaMapMarkerAlt className="profile-icon" />
          <div>
            <p className="label">Address</p>
            <span className="value">{profile.address || '44/25, 2nd Floor, Tambaram Street, Chennai, India'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
