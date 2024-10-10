import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import './css/Appointment.css'; // Importing the CSS file

const Appointment = () => {
  const { docId } = useParams();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Placeholder data to simulate the absence of an API/backend
  const doctors = [
    {
      _id: '1',
      name: 'Dr. Muneel Haider',
      speciality: 'Cardiologist',
      degree: 'MD',
      experience: '10 years',
      fees: 100,
      image: assets.doc1,
      about: 'Experienced Cardiologist with a focus on patient care.',
      available: true,
      slots_booked: {
        '1_1_2024': ['10:30 AM', '11:00 AM'],
      },
    },
  ];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  }, [docId]);

  useEffect(() => {
    if (docInfo) {
      let today = new Date();
      let slots = [];

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);
        let timeSlots = [];

        for (let j = 10; j <= 20; j += 0.5) {
          let hour = Math.floor(j);
          let minute = j % 1 === 0 ? '00' : '30';
          let formattedTime = `${hour}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;

          const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
          const isSlotAvailable = !docInfo.slots_booked[slotDate]?.includes(formattedTime);

          if (isSlotAvailable) {
            timeSlots.push({
              datetime: currentDate,
              time: formattedTime,
            });
          }
        }

        slots.push(timeSlots);
      }

      setDocSlots(slots);
    }
  }, [docInfo]);

  return docInfo ? (
    <div>
      <div className='appointment-details'>
        <div>
          <img className='doctor-image' src={docInfo.image} alt="" />
        </div>

        <div className='doctor-info'>
          <p className='doctor-name'>
            {docInfo.name} <img className='doctor-verified' src={assets.verified_icon} alt="" />
          </p>
          <div className='doctor-degree'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='doctor-experience'>{docInfo.experience}</button>
          </div>

          <div>
            <p className='doctor-about'>About <img className='info-icon' src={assets.info_icon} alt="" /></p>
            <p className='doctor-description'>{docInfo.about}</p>
          </div>

          <p className='doctor-fees'>
            Appointment fee: <span>${docInfo.fees}</span>
          </p>
        </div>
      </div>

      <div className='booking-slots'>
        <p>Booking slots</p>
        <div className='slot-day-list'>
          {docSlots.length && docSlots.map((item, index) => (
            <div onClick={() => setSlotIndex(index)} key={index} className={`slot-day ${slotIndex === index ? 'selected-slot' : ''}`}>
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='slot-time-list'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} key={index} className={`slot-time ${item.time === slotTime ? 'selected-time' : ''}`}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button className='book-button'>Book an appointment</button> {/* Button is non-functional */}
      </div>

      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
}

export default Appointment;
