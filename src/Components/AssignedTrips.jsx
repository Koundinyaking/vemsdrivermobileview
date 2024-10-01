import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaHome, FaCog, FaMapMarkerAlt, FaWalking, FaClock, FaStopwatch, FaArrowLeft, FaArrowRight, FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import './AssignedTrips.css';
import axios from 'axios';

const AssignedTrips = () => {
  const navigate = useNavigate();
  
  const [tripsData, setTripsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const driverId = localStorage.getItem('driverId');
  
  const handleDriverTrips = async () => {
    try {
      const trips = await axios.get(`http://localhost:5000/driver/getTripDetails/${driverId}`);
      setTripsData(trips.data.tripDetails);
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleBackButtonClick = () => {
    navigate('/home'); 
  };

  // Move to the next card
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === tripsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Move to the previous card
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tripsData.length - 1 : prevIndex - 1
    );
  };
  
  useEffect(() => {
    handleDriverTrips();
  }, []);

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
            {/* Carousel Content */}
            <div className="carousel-content">
              <button className="prev-button" onClick={handlePrev}>
                <FaArrowAltCircleLeft size={30} />
              </button>

              {/* Display Current Trip Card */}
              {tripsData.map((trip, index) => (
                <div
                  key={trip.TripId}
                  className={`trip-card ${index === currentIndex ? 'active' : ''}`}
                  style={{ display: index === currentIndex ? 'block' : 'none' }}
                >
                  <h3>{trip.BookingId}</h3>
                  <div className="trip-info-summary">
                    <span>
                      <FaClock /> {trip.TotalTime} &nbsp;&nbsp; 
                      <FaStopwatch /> {trip.SeatCapacity - 1} Stops
                    </span>
                  </div>

                  <div className="trip-details">
                    <div className="your-location">
                      <div className="location-row">
                        <FaMapMarkerAlt className="location-icon" />
                        <div className="location-details">
                          {trip.Address} · {trip.City}
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

              <button className="next-button" onClick={handleNext}>
                <FaArrowAltCircleRight size={30} />
              </button>
            </div>

            {/* Carousel Dots */}
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
            <div className={`trip-card active`}>
              <div className="trip-info-summary">
                <h2>No Assigned Trips yet</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignedTrips;
