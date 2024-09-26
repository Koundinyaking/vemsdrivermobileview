import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaHome, FaCog, FaMapMarkerAlt, FaWalking, FaClock, FaStopwatch,FaArrowLeft } from 'react-icons/fa';
import './AssignedTrips.css';
import axios from 'axios';

const AssignedTrips = () => {
  const navigate = useNavigate();
  
  const [tripsData, setTripsData] = useState([])
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const driverId = localStorage.getItem('driverId');
  
  const handleDriverTrips = async ()=>{
    try{
      const trips = await axios.get(`http://localhost:5000/driver/getTripDetails/${driverId}`)
      setTripsData(trips.data.tripDetails)
    }
    catch(err){
      console.log(err)
    }
  }
  
  const handleBackButtonClick = () => {
    navigate('/home'); 
  };
  
  useEffect(()=>{
     handleDriverTrips()
  }, [])

  console.log(tripsData)
  return (
    <div className="assigned-trips-container">
      <div className="header">
        <button className="back-button" onClick={handleBackButtonClick}>
          <FaArrowLeft />
        </button>
        <h2>Assigned Trips</h2>
      </div>
  
      <div className="map-background"></div>
  
      <div className="card-carousel">
        {tripsData && tripsData.length > 0 ? (
          <div>
            {tripsData.map((trip, index) => (
              <div
                key={trip.TripId}
                className={`trip-card ${index === currentIndex ? 'active' : ''}`}
              >
                <h3>{trip.BookingId}</h3>
                <div className="trip-info-summary">
                  <span>
                    {/* <FaWalking /> {trip.distance}  */}
                    &nbsp;&nbsp;
                    <FaClock /> {trip.duration} &nbsp;&nbsp; 
                    <FaStopwatch /> {trip.VehicleSeatCapacity - 1} Stops
                  </span>
                </div>
  
                <div className="trip-details">
                  <div className="your-location">
                    <div className="location-row">
                      <FaMapMarkerAlt className="location-icon" />
                      <div className="location-details">
                        {trip.EmployeeAddress} · {trip.EmployeeCity}
                      </div>
                    </div>
                    <p className="location-address">{trip.yourLocation}</p>
                  </div>
  
                  <div className="final-destination">
                    <div className="location-row">
                      <FaMapMarkerAlt className="location-icon" />
                      <div className="location-details">
                        The Hive, Thiruvanmiyyur
                      </div>
                    </div>
                    <p className="location-address">{trip.finalDestination}</p>
                  </div>
                </div>
              </div>
            ))}
  
            <div className="carousel-dots">
              {tripsData.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                ></span>
              ))}
            </div>
          </div>
        ) : (
          <div className="card-carousel">
            <div
                className={`trip-card ${'active'}`}
              >
              {/* <div className="trip-details">   */}
              <div className="trip-info-summary">
                <h2>No Assigned Trips yet</h2>
              </div>
              {/* </div> */}
            </div>
          </div>
        )}
      </div>
  
      {/* Optional footer section */}
      {/* <div className="footer-icons">
        <FaHome className="home-icon" />
        <FaCog className="settings-icon" />
      </div> */}
    </div>
  );
}

export default AssignedTrips;
