import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaHome, FaCog, FaMapMarkerAlt, FaWalking, FaClock, FaStopwatch,FaArrowLeft } from 'react-icons/fa';
import './AssignedTrips.css';

const AssignedTrips = () => {
  const navigate = useNavigate();
  const tripsData = [
    {
      id: 1,
      TripId: 'Tripid:2345678',
      distance: '12 Km',
      duration: '30 Min',
      stops: 4,
      yourLocation: {
        distance: '1 Km',
        time: '10 Mins away',
        address: '7675 Hillcrest St. Fairport, NY 14450',
      },
      finalDestination: {
        distance: '10 Km',
        time: '30 Mins Trip',
        address: '70 La Sierra St. Massapequa, NY 11758',
      },
    },
    {
        id: 2,
        TripId: 'Tripid:2345678',
        distance: '12 Km',
        duration: '30 Min',
        stops: 4,
        yourLocation: {
          distance: '1 Km',
          time: '10 Mins away',
          address: '7675 Hillcrest St. Fairport, NY 14450',
        },
        finalDestination: {
          distance: '10 Km',
          time: '30 Mins Trip',
          address: '70 La Sierra St. Massapequa, NY 11758',
        },
      },
      {
        id: 3,
        TripId: 'Tripid:2345678',
        distance: '12 Km',
        duration: '30 Min',
        stops: 4,
        yourLocation: {
          distance: '1 Km',
          time: '10 Mins away',
          address: '7675 Hillcrest St. Fairport, NY 14450',
        },
        finalDestination: {
          distance: '10 Km',
          time: '30 Mins Trip',
          address: '70 La Sierra St. Massapequa, NY 11758',
        },
      },
   
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBackButtonClick = () => {
    navigate('/home'); 
  };

  return (
    <div className="assigned-trips-container">
      <div className="header">
        <button className="back-button"  onClick={handleBackButtonClick}><FaArrowLeft /></button>
        <h2>Assigned Trips</h2>
      </div>
      <div className="map-background">
      </div>
      <div className="card-carousel">
        {tripsData.map((trip, index) => (
          <div
            key={trip.TripId}
            className={`trip-card ${index === currentIndex ? 'active' : ''}`}
          >
            <h3>{trip.TripId}</h3>
            <div className="trip-info-summary">
              <span>
                {/* <FaWalking /> {trip.distance}  */}
                &nbsp;&nbsp;
               <FaClock /> {trip.duration} &nbsp;&nbsp; <FaStopwatch /> {trip.stops} Stops
              </span>
            </div>
            <div className="trip-details">
              <div className="your-location">
                <div className="location-row">
                  <FaMapMarkerAlt className="location-icon" />
                  <div className="location-details">
                    Your Location · {trip.yourLocation.distance} · {trip.yourLocation.time}
                  </div>
                </div>
                <p className="location-address">{trip.yourLocation.address}</p>
              </div>
              <div className="final-destination">
                <div className="location-row">
                  <FaMapMarkerAlt className="location-icon" />
                  <div className="location-details">
                    {trip.finalDestination.distance} · {trip.finalDestination.time}
                  </div>
                </div>
                <p className="location-address">{trip.finalDestination.address}</p>
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
      {/* <div className="footer-icons">
        <FaHome className="home-icon" />
        <FaCog className="settings-icon" />
      </div> */}
    </div>
  );
};

export default AssignedTrips;

