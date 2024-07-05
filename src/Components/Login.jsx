import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app);

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook for redirection

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful!");
            setTimeout(() => {
                navigate('/'); // Redirect to login page
              }, 1500);
           
        } catch (err) {
            toast.error("Login failed. Please check your credentials.");
            setError(err.message); // Set error message for display
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
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
            <div className="create-account">
                <p>Don't have an account?</p>
                <Link to="/createaccount">
                    <button className="create-account-button">Create Account</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;
