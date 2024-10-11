import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import doc_1 from '../assets/doc14.png';
import doc_2 from '../assets/zahoor.png';
import './css/Doctors.css'; 

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const doctors = [
    {
      _id: '1',
      name: 'Dr. Muneel Haider',
      speciality: 'Cardiologist',
      available: true,
      image: doc_1
    },
    {
      _id: '2',
      name: 'Dr. Abdullah',
      speciality: 'Dermatologist',
      available: false,
      image: doc_2
    },
  ];

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality]);

  return (
    <div>
      <p className='doctor-intro-text'>Browse through the doctors specialist.</p>
      <div className='doctor-grid'>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`filter-button ${showFilter ? 'bg-primary text-white' : ''}`}
        >
          Filters
        </button>

        <div className={`filter-list ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p
            onClick={() => speciality === 'Cardiologist' ? navigate('/doctors') : navigate('/doctors/Cardiologist')}
            className={`filter-item ${speciality === 'Cardiologist' ? 'bg-[#E2E5FF] text-black' : ''}`}
          >
            Cardiologist
          </p>
          <p
            onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
            className={`filter-item ${speciality === 'Dermatologist' ? 'bg-[#E2E5FF] text-black' : ''}`}
          >
            Dermatologist
          </p>
        </div>

        <div className='doctor-list'>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className='doctor-card'
              key={index}
            >
              <img className='doctor-image' src={item.image} alt="" />
              <div className='doctor-info'>
                <div className={`availability ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                  <p className={`status-dot ${item.available ? 'bg-green-500' : 'bg-gray-500'}`}></p>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className='doctor-name'>{item.name}</p>
                <p className='doctor-speciality'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
