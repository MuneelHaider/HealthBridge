import React from 'react';
import { assets } from '../assets/assets';
import './css/Contact.css'; // Import the CSS file

const Contact = () => {
  return (
    <div>
      <div className='contact-title'>
        <p>CONTACT <span className='contact-title-highlight'>US</span></p>
      </div>

      <div className='contact-details'>
        <img className='contact-image' src={assets.contact_image} alt="" />
        <div className='office-details'>
          <p className='office-title'>OUR OFFICE</p>
          <p className='office-address'>
            54709 Willms Station <br /> Suite 350, Washington, USA
          </p>
          <p className='office-contact'>
            Tel: (415) 555-0132 <br /> Email: greatstackdev@gmail.com
          </p>
          <p className='careers-title'>CAREERS AT PRESCRIPTO</p>
          <p className='careers-info'>Learn more about our teams and job openings.</p>
          <button className='explore-jobs-button'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
