// src/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { app } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const auth = getAuth(app);

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logout successful!');
            navigate('/login'); 
        } catch (error) {
            toast.error('Logout failed: ' + error.message);
        }
    };

    return (
        <div className="logout-container">
            <h2>Are you sure you want to logout?</h2>
            <button onClick={handleLogout}>Logout</button>
            <ToastContainer />
        </div>
    );
};

export default Logout;
