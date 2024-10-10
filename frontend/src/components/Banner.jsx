import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import './css/Banner.css'; // Tailwind CSS with @apply

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className='banner-container'>
      <div className='banner-left'>
        <div className='banner-text'>
          <p>Book Appointment</p>
          <p className='mt-4'>With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className='banner-button'
        >
          Create account
        </button>
      </div>

      <div className='banner-right'>
        <img
          className='banner-image'
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
