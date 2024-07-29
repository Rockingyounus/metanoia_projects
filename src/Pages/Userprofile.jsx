import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Userprofile.css';
import { realtimeDb } from "../Components/firebase"; 
import { ref, push, set } from "firebase/database";

const Userprofile = () => {
  const [name, setName] = useState('');
  const [teamUse, setTeamUse] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const newProfileRef = push(ref(realtimeDb, 'profiles'));
      await set(newProfileRef, {
        name,
        teamUse
      });
      console.log("Profile created with ID: ", newProfileRef.key);
      alert(`Profile created for ${name}`);
      navigate('/todolist'); 
    } catch (e) {
      console.error("Error adding profile: ", e);
      alert("Error creating profile");
    }
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Create your profile</h2>
        <div className="input-group">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Write your name here"
          />
        </div>
        <div className="input-group">
          <label htmlFor="teamUse">
            <input
              type="checkbox"
              id="teamUse"
              checked={teamUse}
              onChange={(e) => setTeamUse(e.target.checked)}
            />
            Create your profile with your team
          </label>
        </div>
        <button type="submit" className="continue-button">Continue</button>
      </form>
    </div>
  );
};

export default Userprofile;
