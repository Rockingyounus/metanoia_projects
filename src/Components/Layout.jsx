// src/Components/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'; 
import Footer from './Footer'; 

const Layout = ({ children }) => {
  const location = useLocation();
  const noFooterPaths = ['/userprofile', '/todolist'];

  return (
    <div>
      <Navbar />
      <main>{children}</main>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
