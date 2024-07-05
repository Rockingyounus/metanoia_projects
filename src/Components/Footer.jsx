import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-content">
        <div className="footer-column">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at tristique risus.</p>
        </div>
        <div className="footer-column">
            <h3>Quick Links</h3>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
        <div className="footer-column">
            <h3>Contact Us</h3>
            <p>Email: info@yourcompany.com</p>
            <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-column">
            <h3>Follow Us</h3>
            <ul className="footer-social">
                <li><a href="#facebook"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#twitter"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#instagram"><i className="fab fa-instagram"></i></a></li>
                <li><a href="#linkedin"><i className="fab fa-linkedin-in"></i></a></li>
            </ul>
        </div>
    </div>
    <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
    </div>
</footer>
  )
}

export default Footer