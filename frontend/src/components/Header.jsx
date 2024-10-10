import React from 'react';
import { assets } from '../assets/assets';
import './css/Header.css'; // Importing the new CSS file with @apply directive

const Header = () => {
  return (
    <div className='header-container'>
      {/* --------- Header Left --------- */}
      <div className='header-left'>
        <p className='header-text'>
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className='header-description'>
          <img className='header-image' src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a href='#speciality' className='header-button'>
          Book appointment <img className='arrow-icon' src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* --------- Header Right --------- */}
      <div className='header-right'>
        <img className='header-right-image' src={assets.header_img} alt="" />
      </div>
    </div>
  );
};

export default Header;
