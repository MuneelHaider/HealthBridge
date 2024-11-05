import React from 'react';
import { assets } from '../assets/assets';
import './css/Header.css';

const Header = () => {
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

        {/* This is where we need to add our links */}
        
        <a href='#speciality' className='header-button'>
          Book appointment <img className='arrow-icon' src={assets.arrow_icon} alt="" />
        </a>
        <a href='#speciality' className='header-button'>
          AI Diagnostics <img className='arrow-icon' src={assets.arrow_icon} alt="" />
        </a>
        <a href='#speciality' className='header-button'>
          Find Recommended Doctors <img className='arrow-icon' src={assets.arrow_icon} alt="" />
        </a>
      </div>

      <div className='header-right'>
        <img className='header-right-image' src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
