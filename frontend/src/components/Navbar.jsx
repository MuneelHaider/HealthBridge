import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  return (
    <div className='navbar-container'>
      {/* Logo and HealthBridge Title */}
      <div className='navbar-logo-wrapper' onClick={() => navigate('/')}>
        <img className='navbar-logo' src={assets.logo} alt="Logo" />
        <span className='navbar-title'>HealthBridge</span>
      </div>

      <ul className='navbar-menu'>
        <NavLink to='/'>
          <li className='navbar-item'>HOME</li>
          <hr className='navbar-hr' />
        </NavLink>
        <NavLink to='/doctors'>
          <li className='navbar-item'>ALL DOCTORS</li>
          <hr className='navbar-hr' />
        </NavLink>
        <NavLink to='/about'>
          <li className='navbar-item'>ABOUT</li>
          <hr className='navbar-hr' />
        </NavLink>
        <NavLink to='/contact'>
          <li className='navbar-item'>CONTACT</li>
          <hr className='navbar-hr' />
        </NavLink>
      </ul>

      <div className='navbar-right'>
        {token && userData ? (
          <div className='navbar-user group'>
            <img className='user-avatar' src={userData.image} alt="" />
            <img className='dropdown-icon' src={assets.dropdown_icon} alt="" />
            <div className='user-menu group-hover:block'>
              <div className='user-menu-content'>
                <p onClick={() => navigate('/my-profile')} className='menu-item'>My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className='menu-item'>My Appointments</p>
                <p onClick={logout} className='menu-item'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='navbar-login-btn'>
            Create account
          </button>
        )}
        <img onClick={() => setShowMenu(true)} className='menu-icon' src={assets.menu_icon} alt="" />
      </div>
    </div>
  );
};

export default Navbar;
