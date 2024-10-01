import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import './TripHistory.css';
import { useNavigate } from 'react-router-dom'; 
import { FaArrowLeft, FaMapMarkerAlt, FaChevronDown, FaCalendarAlt,FaUserAlt } from 'react-icons/fa';
import axios from 'axios';

const TripHistory = () => {
  const navigate = useNavigate();
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [expandedTripId, setExpandedTripId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [tripHistory, setTripHistory] = useState([])
  const [activeTab, setActiveTab] = useState('Today');
  const driverId = localStorage.getItem('driverId')
  const [tripDetails, setTripDetails] = useState([])

  const handleCalendarClick = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const handleExpandClick = (tripId) => {
    setExpandedTripId(expandedTripId === tripId ? null : tripId);
  };

  const handleTripHistory = async ()=>{
    const tripH = await axios.get(`http://localhost:5000/driver/getTripHistory/${driverId}`)
    setTripHistory(tripH.data.trip)
  }
  
  const todayDate = new Date();
  const formattedDate = `${todayDate.getDate().toString().padStart(2, '0')}/${(todayDate.getMonth() + 1).toString().padStart(2, '0')}/${todayDate.getFullYear()}`;
  const handleDateDifference=()=>{
    const convertStringToDate = (dateString) => {
      const [day, month, year] = dateString.split('/');
      return new Date(`${year}-${month}-${day}`);
    };

    const todayDateObject = convertStringToDate(formattedDate);
    const tripDateObject = convertStringToDate(tripHistory[0].TripDate);
    const timeDifference = todayDateObject.getTime() - tripDateObject.getTime();
    const differenceInDays = timeDifference / (1000 * 60 * 60 * 24);
    return (Math.abs(Math.floor(differenceInDays)))
  }
  
  const handleTabInfor = async (slectedTab) => {
    try {
      let filteredTrips = [];
      if (slectedTab === 'Today') {
        filteredTrips = tripHistory.filter(trip => trip.TripDate === formattedDate);
      } else if (slectedTab === 'Yesterday') {
        filteredTrips = tripHistory.filter(trip => handleDateDifference(trip.TripDate) === 1);
      } else if (slectedTab === 'Last Week') {
        filteredTrips = tripHistory.filter(trip => handleDateDifference(trip.TripDate) > 1);
      }
      if (filteredTrips.length > 0) {
        const newTripDetails = filteredTrips.map(trip => ({
          BookingId: trip.BookingId,
          TripDate: trip.TripDate,
          PriorityOrder: trip.PriorityOrder,
          EmployeeName: trip.EmployeeName,
          EmployeeAddress: trip.EmployeeAddress,
          StartTime: trip.StartTime,
          EndTime: trip.EndTime
        }));
        setTripDetails(prevDetails => [...prevDetails, ...newTripDetails]);
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  
  const handleTabClick = async (tab) => {
    setTripDetails([])
    handleTabInfor(tab)
    setActiveTab(tab)
  };
  
  const handleBackButtonClick = () => {
    navigate('/home'); 
  };

  useEffect(()=>{
    handleTripHistory()
  }, [])

  return (
    <div className="trip-history-container">
      <div className="trip-history-header">
        <FaArrowLeft onClick={handleBackButtonClick} className="back-icon" />
        <br></br>
        <h2>Trip History</h2>
        <FaCalendarAlt className="calendar-icon" onClick={handleCalendarClick} />
        {isCalendarOpen && (
          <div className="calendar-popup">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              inline
            />
          </div>
        )}
      </div>
      <div className="trip-history-tabs">
        <button className={`tab ${activeTab === 'Today' ? 'active' : ''}`} onClick={()=>handleTabClick('Today')}>Today</button>
        <button className={`tab ${activeTab === 'Yesterday' ? 'active' : ''}`} onClick={() => handleTabClick('Yesterday')}>Yesterday</button>
        <button className={`tab ${activeTab === 'Last Week' ? 'active' : ''}`} onClick={() => handleTabClick('Last Week')}>Last Week</button>
      </div>
      {tripDetails.map(trip => (
        <div className="trip-history-content" key={trip.BookingId}>
          <div className="trip-history-card">
            <div className="trip-card-header" onClick={() => handleExpandClick(trip.BookingId)}>
              <div>
                <p className="trip-id">TRIP ID : {trip.BookingId}</p>
                <p className="trip-date">{trip.TripDate}</p>
              </div>
                <FaChevronDown
                  className={`chevron-icon ${expandedTripId === trip.BookingId ? 'expanded' : ''}`}
                />
              </div>
              {expandedTripId === trip.BookingId && (
                <>
                <div className="trip-history-details">
                  <div className="trip-detail"> 
                    <p className="label"><FaUserAlt /> &nbsp; Employee Details</p>
                    
                    <p className="value" >{trip.EmployeeName}</p>
                  </div>
                </div>
                <div className="trip-locations">
                  <div className="trip-location">
                    <div>
                      <div style={{ display: 'flex' }}>
                        <FaMapMarkerAlt className="location-icon" style={{ color: 'red' }} />
                        <p>{trip.EmployeeAddress}</p>
                      </div>
                      <br />
                      <div style={{ display: 'flex' }}>
                        <FaMapMarkerAlt className="location-icon" style={{ color: 'black' }} />
                        <p>The Hive</p>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="time">In Time: {trip.StartTime}</p>
                        <p className="time">Out Time: {trip.EndTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ))
      }
    </div>
  );
};

export default TripHistory;


