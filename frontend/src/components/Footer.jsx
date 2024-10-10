import React from 'react';
import { assets } from '../assets/assets';
import './css/Footer.css'; // Importing the new CSS file with @apply directive

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-content'>
        <div>
          <img className='footer-logo' src={assets.logo} alt="" />
          <p className='footer-text'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>

        <div>
          <p className='footer-heading'>COMPANY</p>
          <ul className='footer-list'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='footer-heading'>GET IN TOUCH</p>
          <ul className='footer-list'>
            <li>+1-212-456-7890</li>
            <li>greatstackdev@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='footer-copyright'>
          Copyright 2024 @ Prescripto.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
