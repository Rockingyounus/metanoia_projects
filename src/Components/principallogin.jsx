import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, ref, get, set } from 'firebase/database';
import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './principallogin.css';

const auth = getAuth(app);

const Principallogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
          
            const userRef = ref(getDatabase(app), 'profiles/' + user.uid);
            const snapshot = await get(userRef);
            if (snapshot.exists() && snapshot.val().role === 'principal') {
                toast.success("Login successful!");
                setTimeout(() => {
                    navigate('/Principaldashboard'); 
                }, 1500);
            } else {
                toast.error("You do not have access to the principal dashboard.");
            }
        } catch (err) {
            toast.error("Login failed. Please check your credentials.");
            setError(err.message); 
        }
    };

    return (
        <div className="login-container">
            <h2>Principal Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Principallogin;
