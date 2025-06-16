import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import './css/Header.css';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='header-container'>
      <div className='header-left'>
        <p className='header-text'>
          Book Appointment or get an AI Diagnostic Summary!
        </p>
        <div className='header-description'>
          <img className='header-image' src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' />
            or get an automated diagnostics report!
          </p>
        </div>

        {/* Updated links with navigation */}
        <button
          onClick={() => navigate('/doctors')}
          className='header-button'
        >
          Book Appointment <img className='arrow-icon' src={assets.arrow_icon} alt="" />
        </button>
        <button
          onClick={() => navigate('/VirtualAssistantAI')}
          className='header-button'
        >
          AI Diagnostics <img className='arrow-icon' src={assets.arrow_icon} alt="" />
        </button>
        <button
          onClick={() => navigate('/VirtualAssistantAI')}
          className='header-button'
        >
          Find Recommended Doctors <img className='arrow-icon' src={assets.arrow_icon} alt="" />
        </button>
      </div>

      <div className='header-right'>
        <img className='header-right-image' src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
