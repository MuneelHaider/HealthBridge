import React, { useState } from 'react';
import './css/MyAppointments.css'; 
import { assets } from '../assets/assets'; 

const MyAppointments = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const appointments = [
    {
      _id: '1',
      docData: {
        name: 'Dr. Muneel Haider',
        speciality: 'Cardiologist',
        address: {
          line1: 'AK Brohi Road',
          line2: 'H11, Islamabad',
        }
      },
      slotDate: '20_01_2024',
      slotTime: '10:30 AM',
      cancelled: false,
      payment: false,
      isCompleted: false,
    }
  ];

  const [payment, setPayment] = useState('');

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  return (
    <div>
      <p className='appointments-title'>My appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div key={index} className='appointment-card'>
            <div>
              <img className='appointment-doctor-image' src={item.docData.image} alt="" />
            </div>
            <div className='appointment-details'>
              <p className='doctor-name'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='address-title'>Address:</p>
              <p>{item.docData.address.line1}</p>
              <p>{item.docData.address.line2}</p>
              <p className='date-time'>
                <span className='date-time-title'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className='appointment-actions'>
              {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                <button onClick={() => setPayment(item._id)} className='pay-online-button'>Pay Online</button>
              )}
              {!item.cancelled && item.payment && !item.isCompleted && (
                <button className='paid-button'>Paid</button>
              )}
              {item.isCompleted && (
                <button className='completed-button'>Completed</button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button className='cancel-button'>Cancel appointment</button>
              )}
              {item.cancelled && !item.isCompleted && (
                <button className='cancelled-button'>Appointment cancelled</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
