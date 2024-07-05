import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="meeting-section">
        <h2>Arrange Meeting with Team</h2>
        <button className="meeting-button">Arrange Meeting</button>
      </div>
      <div className="meeting-section">
        <h2>Arrange Meeting with Principal</h2>
        <button className="meeting-button">Arrange Meeting</button>
      </div>
    </div>
  );
}

export default Home;
