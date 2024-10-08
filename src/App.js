import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AssignedTrips from './Components/AssignedTrips';
import Profile from './Components/Profile';
import TripHistory from './Components/TripHistory';
import Home from './Components/Home';
import LoginPage from './Components/LoginPage';
import Landing from './Components/Landing'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/assigned-trips" element={<AssignedTrips />} />
          <Route path="/trip-history" element={<TripHistory />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

