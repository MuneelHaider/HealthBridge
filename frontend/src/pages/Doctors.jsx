import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './css/Doctors.css'; // Import the CSS file

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  // Placeholder data for offline functionality
  const doctors = [
    {
      _id: '1',
      name: 'Dr. John Doe',
      speciality: 'Cardiology',
      available: true,
      image: 'path_to_image', // Replace with actual image
    },
    {
      _id: '2',
      name: 'Dr. Jane Smith',
      speciality: 'Dermatologist',
      available: false,
      image: 'path_to_image',
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
            onClick={() => speciality === 'Cardiology' ? navigate('/doctors') : navigate('/doctors/Cardiology')}
            className={`filter-item ${speciality === 'Cardiology' ? 'bg-[#E2E5FF] text-black' : ''}`}
          >
            Cardiology
          </p>
          <p
            onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
            className={`filter-item ${speciality === 'Dermatologist' ? 'bg-[#E2E5FF] text-black' : ''}`}
          >
            Dermatologist
          </p>
          {/* Add more filters as needed */}
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
