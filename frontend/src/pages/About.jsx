import React from 'react';
import { assets } from '../assets/assets';
import './css/About.css'; // Import the CSS file

const About = () => {
  return (
    <div>
      <div className='about-title'>
        <p>
          ABOUT <span className='about-title-highlight'>US</span>
        </p>
      </div>

      <div className='about-content'>
        <img className='about-image' src={assets.about_image} alt="" />
        <div className='about-text'>
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <b className='about-vision-title'>Our Vision</b>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      <div className='about-why'>
        <p>
          WHY <span className='about-title-highlight'>CHOOSE US</span>
        </p>
      </div>

      <div className='about-cards'>
        <div className='about-card hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='about-card hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
          <b>CONVENIENCE: </b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='about-card hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
