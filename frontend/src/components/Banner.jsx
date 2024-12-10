import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import './css/Banner.css';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className='banner-container'>
      <div className='banner-left'>
        <div className='banner-text'>
          <p>Get an automated Diagnostic Report!</p>
        </div>
        <button
          onClick={() => {
            navigate('/VirtualAssistantAI');
            scrollTo(0, 0);
          }}
          className='banner-button'
        >
          Get Diagnostic Report
        </button>
      </div>
      <div className='banner-right'>
        <img
          className='banner-image'
          src={assets.appointment_img}
          alt=""
          style={{paddingTop: "50px"}}
        />
      </div>
    </div>
  );
};

export default Banner;
