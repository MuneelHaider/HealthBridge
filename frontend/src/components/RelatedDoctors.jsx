import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './css/RelatedDoctors.css'; // Importing the CSS file

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className='related-doctors-container'>
      <h1 className='related-doctors-heading'>Related Doctors</h1>
      <p className='related-doctors-description'>
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className='related-doctors-grid'>
        {relDoc.map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className='related-doctor-card hover:translate-y-[-10px] transition-all duration-500 cursor-pointer'
            key={index}
          >
            <img className='doctor-image bg-[#EAEFFF]' src={item.image} alt="" />
            <div className='doctor-details'>
              <div
                className={`doctor-availability flex items-center gap-2 text-sm text-center ${
                  item.available ? 'text-green-500' : 'text-gray-500'
                }`}
              >
                <p
                  className={`doctor-status-dot w-2 h-2 rounded-full ${
                    item.available ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                ></p>
                <p>{item.available ? 'Available' : 'Not Available'}</p>
              </div>
              <p className='doctor-name'>{item.name}</p>
              <p className='doctor-speciality'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
