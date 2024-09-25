import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import './TripHistory.css';
import { useNavigate } from 'react-router-dom'; 
import { FaArrowLeft, FaMapMarkerAlt, FaChevronDown, FaCalendarAlt } from 'react-icons/fa';

const TripHistory = () => {
  const navigate = useNavigate();
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [expandedTripId, setExpandedTripId] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('Today');

  const handleCalendarClick = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const handleExpandClick = (tripId) => {
    setExpandedTripId(expandedTripId === tripId ? null : tripId);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleBackButtonClick = () => {
    navigate('/home'); 
  };

  // Define trip data for different tabs
  const tripData = {
    Today: [
      {
        id: 'ABCDE12345',
        date: '02 Jan 23, 03:00 PM - 02 Jan 23, 4:00 PM',
        distance: '12 Km',
        employees: '4',
        type: 'Pickup',
        locations: [
          { address: '7675 Hillcrest St. Fairport, NY 14450', time: '02 Jan 23, 03:00 PM' },
          { address: '70 La Sierra St. Massapequa, NY 11758', time: '02 Jan 23, 04:00 PM', isEndLocation: true }
        ]
      },
      {
        id: 'ABCDE12346',
        date: '02 Jan 23, 04:00 PM - 02 Jan 23, 05:00 PM',
        distance: '8 Km',
        employees: '3',
        type: 'Drop',
        locations: [
          { address: '85 Cherry Hill, Boston, MA 02108', time: '02 Jan 23, 04:00 PM' },
          { address: '123 Main St, Springfield, IL 62701', time: '02 Jan 23, 05:00 PM', isEndLocation: true }
        ]
      }
    ],
    Yesterday: [
      {
        id: 'ABCDE54321',
        date: '01 Jan 23, 08:00 AM - 01 Jan 23, 09:00 AM',
        distance: '15 Km',
        employees: '5',
        type: 'Pickup',
        locations: [
          { address: '123 Elm St. Townsville, TX 78901', time: '01 Jan 23, 08:00 AM' },
          { address: '456 Oak St. Cityville, CA 90210', time: '01 Jan 23, 09:00 AM', isEndLocation: true }
        ]
      },
      {
        id: 'ABCDE54322',
        date: '01 Jan 23, 10:00 AM - 01 Jan 23, 11:00 AM',
        distance: '20 Km',
        employees: '6',
        type: 'Drop',
        locations: [
          { address: '789 Pine St. Metropolis, IL 62704', time: '01 Jan 23, 10:00 AM' },
          { address: '101 Maple St. Villagetown, NY 10001', time: '01 Jan 23, 11:00 AM', isEndLocation: true }
        ]
      },
      {
        id: 'ABCDE54323',
        date: '01 Jan 23, 02:00 PM - 01 Jan 23, 03:00 PM',
        distance: '10 Km',
        employees: '4',
        type: 'Pickup',
        locations: [
          { address: '202 Birch St. Suburbia, FL 33101', time: '01 Jan 23, 02:00 PM' },
          { address: '303 Cedar St. Uptown, WA 98101', time: '01 Jan 23, 03:00 PM', isEndLocation: true }
        ]
      }
    ],
    'Last Week': [
      {
        id: 'ABCDE67890',
        date: '25 Dec 23, 09:00 AM - 25 Dec 23, 10:00 AM',
        distance: '30 Km',
        employees: '8',
        type: 'Pickup',
        locations: [
          { address: '404 Spruce St. Downtown, CO 80123', time: '25 Dec 23, 09:00 AM' },
          { address: '505 Fir St. Lakewood, NJ 07001', time: '25 Dec 23, 10:00 AM', isEndLocation: true }
        ]
      },
      {
        id: 'ABCDE67891',
        date: '26 Dec 23, 11:00 AM - 26 Dec 23, 12:00 PM',
        distance: '25 Km',
        employees: '7',
        type: 'Drop',
        locations: [
          { address: '606 Willow St. Ridgefield, MA 02120', time: '26 Dec 23, 11:00 AM' },
          { address: '707 Maplewood Ave. Brookline, CT 06001', time: '26 Dec 23, 12:00 PM', isEndLocation: true }
        ]
      },
      {
        id: 'ABCDE67892',
        date: '27 Dec 23, 01:00 PM - 27 Dec 23, 02:00 PM',
        distance: '22 Km',
        employees: '6',
        type: 'Pickup',
        locations: [
          { address: '808 Aspen St. Greenville, TN 37027', time: '27 Dec 23, 01:00 PM' },
          { address: '909 Cedarwood Ln. Kingston, MD 21401', time: '27 Dec 23, 02:00 PM', isEndLocation: true }
        ]
      },
      {
        id: 'ABCDE67893',
        date: '28 Dec 23, 03:00 PM - 28 Dec 23, 04:00 PM',
        distance: '18 Km',
        employees: '5',
        type: 'Drop',
        locations: [
          { address: '1010 Oakwood Dr. Mount Vernon, OH 43050', time: '28 Dec 23, 03:00 PM' },
          { address: '1111 Pinecrest Rd. Hilltop, WI 53201', time: '28 Dec 23, 04:00 PM', isEndLocation: true }
        ]
      },
      {
        id: 'ABCDE67894',
        date: '29 Dec 23, 04:00 PM - 29 Dec 23, 05:00 PM',
        distance: '14 Km',
        employees: '4',
        type: 'Pickup',
        locations: [
          { address: '1212 Birchwood Ave. Elmwood, NV 89501', time: '29 Dec 23, 04:00 PM' },
          { address: '1313 Poplar St. Springfield, OR 97401', time: '29 Dec 23, 05:00 PM', isEndLocation: true }
        ]
      }
    ]
  };

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
        <button className={`tab ${activeTab === 'Today' ? 'active' : ''}`} onClick={() => handleTabClick('Today')}>Today</button>
        <button className={`tab ${activeTab === 'Yesterday' ? 'active' : ''}`} onClick={() => handleTabClick('Yesterday')}>Yesterday</button>
        <button className={`tab ${activeTab === 'Last Week' ? 'active' : ''}`} onClick={() => handleTabClick('Last Week')}>Last Week</button>
      </div>

      <div className="trip-history-content">
        {tripData[activeTab].map(trip => (
          <div key={trip.id} className="trip-history-card">
            <div className="trip-card-header" onClick={() => handleExpandClick(trip.id)}>
              <div>
                <p className="trip-id">TRIP ID : {trip.id}</p>
                <p className="trip-date">{trip.date}</p>
              </div>
              <FaChevronDown className={`chevron-icon ${expandedTripId === trip.id ? 'expanded' : ''}`} />
            </div>
            {expandedTripId === trip.id && (
              <>
                <div className="trip-history-details">
                  {/* <div className="trip-detail">
                    <p className="label">Distance</p>
                    <p className="value">{trip.distance}</p>
                  </div> */}
                  <div className="trip-detail">
                    <p className="label">Employees</p>
                    <p className="value">{trip.employees}</p>
                  </div>
                  <div className="trip-detail">
                    <p className="label">Type</p>
                    <p className="value">{trip.type}</p>
                  </div>
                </div>
                <div className="trip-locations">
                  {trip.locations.map((location, index) => (
                    <div key={index} className="trip-location">
                      <FaMapMarkerAlt className="location-icon" style={{ color: location.isEndLocation ? 'red' : 'black' }} />
                      <div>
                        <p>{location.address}</p>
                        <p className="time">{location.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHistory;


