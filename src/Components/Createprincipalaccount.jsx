import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Createprincipalaccount.css';

const auth = getAuth(app);
const database = getDatabase(app);

const CreatePrincipalaccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      setError('All fields are required');
      toast.error('All fields are required');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
    } else {
      setError('');
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success('Account created successfully');
          
          return set(ref(database, 'profiles/' + user.uid), {
            username: username,
            email: user.email,
            role: 'principal'
          });
        })
        .then(() => {
          setTimeout(() => {
            navigate('/principal-login'); 
          }, 1500); 
        })
        .catch((error) => {
          toast.error('Error creating account: ' + error.message);
        });
    }
  };

  return (
    <div className="create-account-container">
      <h2>Create Principal Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create Account</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreatePrincipalaccount;
