// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; 
// import { FaHome, FaCog, FaMapMarkerAlt, FaWalking, FaClock, FaStopwatch, FaArrowLeft, FaArrowRight, FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
// import './AssignedTrips.css';
// import axios from 'axios';

// const AssignedTrips = () => {
//   const navigate = useNavigate();
  
//   const [tripsData, setTripsData] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const driverId = localStorage.getItem('driverId');
  
//   const handleDriverTrips = async () => {
//     try {
//       const trips = await axios.get(`http://localhost:5000/driver/getTripDetails/${driverId}`);
//       setTripsData(trips.data.tripDetails);
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   const handleBackButtonClick = () => {
//     navigate('/home'); 
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === tripsData.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? tripsData.length - 1 : prevIndex - 1
//     );
//   };
  
//   useEffect(() => {
//     handleDriverTrips();
//   }, []);

//   return (
//     <div className="assigned-trips-container">
//       <div className="header">
//         <button className="back-button" onClick={handleBackButtonClick}>
//           <FaArrowLeft />
//         </button>
//         <h2>Assigned Trips</h2>
//       </div>
  
//       <div className="map-background"></div>
  
//       <div className="card-carousel">
//         {tripsData && tripsData.length > 0 ? (
//           <div>
//             <div className="carousel-content">
//   <button className="prev-button" onClick={handlePrev}>
//     <FaArrowAltCircleLeft size={20} />
//   </button>

//   {tripsData.map((trip, index) => (
//     <div
//       key={trip.TripId}
//       className={`trip-card ${index === currentIndex ? 'active' : ''}`}
//       style={{ display: index === currentIndex ? 'block' : 'none' }}
//     >
//       <h3>{trip.BookingId}</h3>
//       <div className="trip-info-summary">
//         <span>
//           <FaClock /> {trip.TotalTime} &nbsp;&nbsp; 
//           <FaStopwatch /> {trip.SeatCapacity - 1} Stops
//         </span>
//       </div>

//       <div className="trip-details">
//         <div className="your-location">
//           <div className="location-row">
//             <FaMapMarkerAlt className="location-icon" />
//             <div className="location-details">
//               {trip.Address} · {trip.City}
//             </div>
//           </div>
//           <p className="location-address">{trip.yourLocation}</p>
//         </div>

//         <div className="final-destination">
//           <div className="location-row">
//             <FaMapMarkerAlt className="location-icon" />
//             <div className="location-details">
//               The Hive, Thiruvanmiyyur
//             </div>
//           </div>
//           <p className="location-address">{trip.finalDestination}</p>
//         </div>
//       </div>
//     </div>
//   ))}

//   <button className="next-button" onClick={handleNext}>
//     <FaArrowAltCircleRight size={20} />
//   </button>
// </div>

//             <div className="carousel-dots">
//               {tripsData.map((_, index) => (
//                 <span
//                   key={index}
//                   className={`dot ${index === currentIndex ? 'active-dot' : ''}`}
//                   onClick={() => setCurrentIndex(index)}
//                 ></span>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="card-carousel">
//             <div className={`trip-card active`}>
//               <div className="trip-info-summary">
//                 <h2>No Assigned Trips yet</h2>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AssignedTrips;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaHome, FaCog, FaMapMarkerAlt, FaWalking, FaClock, FaStopwatch, FaArrowLeft, FaArrowRight, FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import './AssignedTrips.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AssignedTrips = () => {
  const navigate = useNavigate();
  
  const [tripsData, setTripsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [otpInputs, setOtpInputs] = useState({}); 
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

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === tripsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? tripsData.length - 1 : prevIndex - 1
    );
  };

  const handleOtpChange = (e, tripId) => {
    setOtpInputs({
      ...otpInputs,
      [tripId]: e.target.value, 
    });
  };

  const handleOtpSubmit = async (tripId) => {
    try {
      const otp = otpInputs[tripId];
      const response = await axios.post('http://localhost:5000/driver/validateOtp', { tripId, otp });
      
      if (response.data.verified) {
        toast.success('OTP Verified Successfully!', { autoClose: 2000 });
      } else {
        toast.error('Invalid OTP. Please try again.', { autoClose: 2000 });
      }
    } catch (err) {
      toast.error('Error in OTP verification. Please try again later.', { autoClose: 2000 });
      console.log(err);
    }
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
            <div className="carousel-content">
              <button className="prev-button" onClick={handlePrev}>
                <FaArrowAltCircleLeft size={20} />
              </button>

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

                  <div className="otp-section">
                             <input
                                  type="text"
                                  placeholder="Enter OTP"
                                  value={otpInputs[trip.TripId] || ''}
                                  onChange={(e) => handleOtpChange(e, trip.TripId)}
                                              />
                                  <button onClick={() => handleOtpSubmit(trip.TripId)}>
                                  Validate OTP
                                  </button>
                            <p className="otp-info">Please enter the OTP.</p> 
                </div>
                </div>
              ))}

              <button className="next-button" onClick={handleNext}>
                <FaArrowAltCircleRight size={20} />
              </button>
            </div>

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

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AssignedTrips;

