import React, { useState, useEffect } from 'react';
import { db, auth } from '../Components/firebase'; 
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import './Arrangemeeting.css'; 
import { onAuthStateChanged } from 'firebase/auth'; 

const ArrangeMeeting = () => {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [principalAvailableSlots, setPrincipalAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
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

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const q = query(collection(db, 'availability'), where('status', '==', 'available'));
      const querySnapshot = await getDocs(q);
      const slots = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPrincipalAvailableSlots(slots);
    };

    fetchAvailableSlots();
  }, []);

  const handleArrangeMeeting = async (e) => {
    e.preventDefault();

    if (!user || !selectedSlot) return;

    await addDoc(collection(db, 'meetings'), {
      userId: user.uid,
      title: meetingTitle,
      description: meetingDescription,
      date: meetingDate,
      time: meetingTime,
      purpose: meetingPurpose,
      slotId: selectedSlot,
      status: 'booked',
      created_at: new Date().toISOString(),
    });

    setMeetingTitle('');
    setMeetingDescription('');
    setMeetingDate('');
    setMeetingTime('');
    setSelectedSlot('');
    setMeetingPurpose('');
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
        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
          required
        >
          <option value="">Select Available Slot</option>
          {principalAvailableSlots.map(slot => (
            <option key={slot.id} value={slot.id}>{slot.date} - {slot.time}</option>
          ))}
        </select>
        <textarea
          value={meetingPurpose}
          onChange={(e) => setMeetingPurpose(e.target.value)}
          placeholder="Purpose of the Meeting"
          required
        />
        <button type="submit">Arrange Meeting</button>
      </form>
    </div>
  );
};

export default ArrangeMeeting;
