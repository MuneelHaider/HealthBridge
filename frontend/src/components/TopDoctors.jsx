import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import './css/TopDoctors.css'; // Import the CSS file

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className='top-doctors-container'>
      <h1 className='top-doctors-heading'>Top Doctors to Book</h1>
      <p className='top-doctors-description'>
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className='top-doctors-grid'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className='doctor-card hover:translate-y-[-10px] transition-all duration-500 cursor-pointer'
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
      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className='top-doctors-button'
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
