import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('email') && localStorage.getItem('password');

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <Link to="/addressbook"><img src="https://duet-cdn.vox-cdn.com/thumbor/0x0:2012x1341/640x427/filters:focal(1006x670:1007x671):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/15483559/google2.0.0.1441125613.jpg" alt="Logo" width={50} height={50}/></Link>       
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <span>Welcome, {localStorage.getItem('email')}</span>
            <Link to="/addressbook">Address Book</Link>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/">Sign In</Link>
            <Link to="/">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;