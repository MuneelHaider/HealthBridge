import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import './css/SpecialityMenu.css'; 

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='speciality-menu-container'>
      <h1 className='speciality-menu-heading'>Use HealthBridge Chatbot</h1>
      <p className='speciality-menu-description'>
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>
      <div className='speciality-menu-list'>
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className='speciality-item hover:translate-y-[-10px] transition-all duration-500'
            key={index}
          >
            <img className='speciality-image' src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
      <br></br>
      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className='explore-jobs-button'
      >
        USE CHATBOT
      </button>
    </div>
  );
};

export default SpecialityMenu;
