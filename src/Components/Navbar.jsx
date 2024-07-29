// src/Components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false)
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/" className='navbar-brand-logo'>Metanoia</Link>
                </div>
                <div className="navbar-links">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/services">Services</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        <li className="user-icon"
                        onMouseEnter={toggleDropdown}
                        onMouseLeave={closeDropdown}>
                            <FontAwesomeIcon icon={faUser} onClick={toggleDropdown} />
                            {dropdownOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/Login">login</Link>
                                    <Link to="/logout">Logout</Link>
                                    <Link to="/Createaccount">Create Account</Link>
                                    <Link to="/Principallogin">Principal Login</Link>
                                    <Link to="/Createprincipalaccount">Create principal account</Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
