import React from 'react';
import './Home.css';
import teamMeetingImage from '../Assets/p1.JPG';
import principalMeetingImage from '../Assets/p2.jpg'; 

const Home = () => {
  return (
    <div className="home">
      <div className="meeting-section">
        <img src={teamMeetingImage} alt="Team Meeting" className="meeting-image" />
        <h2>Arrange Meeting with Team</h2>
        <button className="meeting-button">Arrange Meeting</button>
      </div>
      <div className="meeting-section">
        <img src={principalMeetingImage} alt="Principal Meeting" className="meeting-image" />
        <h2>Arrange Meeting with Principal</h2>
        <button className="meeting-button">Arrange Meeting</button>
      </div>
    </div>
  );
}

export default Home;
