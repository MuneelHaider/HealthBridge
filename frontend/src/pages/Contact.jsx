import React from 'react';
import { assets } from '../assets/assets';
import './css/Contact.css';

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
            AK Brohi Road <br /> FAST NUCES, Islamabad, Pakistan
          </p>
          <p className='office-contact'>
            Tel: (051) 111-7890 <br /> Email: healthbridge@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
