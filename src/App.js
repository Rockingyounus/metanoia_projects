
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Services';
import Contact from './Pages/Contact';
import Userprofile from './Pages/Userprofile';
import TodoList from './Pages/Todolist';
import Login from './Components/Login';
import Createaccount from './Components/Createaccount';
import Logout from './Components/Logout';
import Arrangemeeting from './Pages/Arrangemeeting';
import CreatePrincipalaccount from './Components/Createprincipalaccount';
import Principallogin from './Components/principallogin';
import Principaldashboard from './Components/Principaldashboard';



const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/logout" element={<Logout/>} />
          <Route path="/Createaccount" element={<Createaccount />} />
          <Route path="/CreatePrincipalaccount" element={<CreatePrincipalaccount/>} />
          <Route path="/Principallogin" element={<Principallogin/>} />
          <Route path="/Principaldashboard" element={<Principaldashboard/>} />
          <Route path="/ArrangeMeeting" element={<Arrangemeeting />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
