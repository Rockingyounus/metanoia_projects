import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../Components/firebase';
import './Principaldashboard.css';

const PrincipalDashboard = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const fetchMeetings = async () => {
            const querySnapshot = await getDocs(collection(db, 'meetings'));
            const meetingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setMeetings(meetingsList);
        };

        fetchMeetings();
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Principal Dashboard</h2>
            <div className="meetings-list">
                {meetings.length > 0 ? (
                    meetings.map((meeting) => (
                        <div key={meeting.id} className="meeting-item">
                            <p><strong>Student ID:</strong> {meeting.userId}</p>
                            <p><strong>Title:</strong> {meeting.title}</p>
                            <p><strong>Date:</strong> {meeting.date}</p>
                            <p><strong>Time:</strong> {meeting.time}</p>
                            <p><strong>Description:</strong> {meeting.description}</p>
                            <p><strong>Purpose:</strong> {meeting.purpose}</p>
                        </div>
                    ))
                ) : (
                    <p>No meetings scheduled</p>
                )}
            </div>
        </div>
    );
};

export default PrincipalDashboard;
