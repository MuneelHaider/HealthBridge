import React from 'react';
import { assets } from '../assets/assets';
import './css/Footer.css'; 

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <div>
          <img className='footer-logo' src={assets.logo} alt="" />
          <p className='footer-text'>
            HealthBridge is a one-stop platform which integrates an appointment
            booking system with state of the art AI, allowing you for automatic
            recommendations and diagnostics on the go!
          </p>
        </div>

        <div>
          <p className='footer-heading'>COMPANY</p>
          <ul className='footer-list'>
            <li>Home</li>
            <li>About us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='footer-heading'>GET IN TOUCH</p>
          <ul className='footer-list'>
            <li>+92-308-8828430</li>
            <li>healthbridge@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='footer-copyright'>
          Copyright 2024 @ HealthBridge.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
