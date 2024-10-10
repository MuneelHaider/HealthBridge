import React from 'react';
import { assets } from '../assets/assets';
import './css/About.css';

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
            Welcome to HealthBridge, your go-to onestop platform which helps you manage your healthcare needs efficiently with the help of AI. HealthBridge uses state of the art AI that helps you not only find recommended doctors according to your problem, but will also help you self-diagnos a problem using HealthBridge's AI Model.
          </p>
          <p>
            Simply upload your scans/files, and see the magic work! HealthBridge is committed to excellence in healthcare technology. We continously strive to enhance our platform, integrating the latest advancements and technologies to improve user experience and product delivery. Whether you are booking your first appointment or using our AI Model, HealthBridge is here to support you every step of the way.
          </p>
          <b className='about-vision-title'>Our Vision</b>
          <p>
            Our vision at HealthBridge is to create a seemless onestop platform for every user. We aim to bridge the gap between patients and doctors, making it easier for you to access the type of care you need using latest technologies when you need it.
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
          <p>Talk to our chatbot which recommendeds you doctors according to your problem.
          </p>
        </div>
        <div className='about-card hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer'>
          <b>AI DIAGNOSTICS ASSISTANCE:</b>
          <p>Use state of the art AI Model to get yourself an AI-generated Diagnostic Report without the involvement of any doctor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
