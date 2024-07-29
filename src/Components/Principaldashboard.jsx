import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from './firebase';
import './Principaldashboard.css';

const database = getDatabase(app);

const Principaldashboard = () => {
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        const meetingsRef = ref(database, 'meetings');
        onValue(meetingsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const parsedMeetings = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setMeetings(parsedMeetings);
            }
        });
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Principal Dashboard</h2>
            <div className="meetings-list">
                {meetings.length > 0 ? (
                    meetings.map((meeting) => (
                        <div key={meeting.id} className="meeting-item">
                            <p><strong>Student:</strong> {meeting.studentName}</p>
                            <p><strong>Time:</strong> {meeting.time}</p>
                            <p><strong>Description:</strong> {meeting.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No meetings scheduled</p>
                )}
            </div>
        </div>
    );
};

export default Principaldashboard;
