import React, { useState, useEffect } from 'react';
import { db, auth } from '../Components/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import './Arrangemeeting.css'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArrangeMeeting = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [meetingPurpose, setMeetingPurpose] = useState('');
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  const handleArrangeMeeting = async (e) => {
    e.preventDefault();

    if (!user) return;

    await addDoc(collection(db, 'meetings'), {
      userId: user.uid,
      title: meetingTitle,
      description: meetingDescription,
      date: meetingDate,
      time: meetingTime,
      purpose: meetingPurpose,
      status: 'booked',
      created_at: new Date().toISOString(),
    });

    // Reset form fields
    setMeetingTitle('');
    setMeetingDescription('');
    setMeetingDate('');
    setMeetingTime('');
    setMeetingPurpose('');

    // Show success notification
    toast.success("Meeting scheduling successful!");
  };

  return (
    <div className="arrange-meeting-container">
      <h2>Arrange a Meeting with the Principal</h2>
      <form onSubmit={handleArrangeMeeting} className="arrange-meeting-form">
        <input
          type="text"
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
          placeholder="Meeting Title"
          required
        />
        <textarea
          value={meetingDescription}
          onChange={(e) => setMeetingDescription(e.target.value)}
          placeholder="Meeting Description"
          required
        />
        <input
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={meetingTime}
          onChange={(e) => setMeetingTime(e.target.value)}
          required
        />
        <textarea
          value={meetingPurpose}
          onChange={(e) => setMeetingPurpose(e.target.value)}
          placeholder="Purpose of the Meeting"
          required
        />
        <button type="submit">Arrange Meeting</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ArrangeMeeting;
