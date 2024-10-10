import React, { useState } from 'react';
import './css/MyProfile.css'; // Importing the CSS file
import { assets } from '../assets/assets'; // Assuming local assets are used

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  // Simulated user data (Placeholder)
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    address: {
      line1: '123 Street Name',
      line2: 'City, Country',
    },
    gender: 'Male',
    dob: '1990-01-01',
    image: 'path_to_image', // Replace with actual image
  });

  return userData ? (
    <div className='profile-container'>

      {isEdit ? (
        <label htmlFor='image'>
          <div className='image-upload-container'>
            <img className='image-upload' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='upload-icon' src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>
      ) : (
        <img className='profile-image' src={userData.image} alt="" />
      )}

      {isEdit ? (
        <input className='edit-name' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
      ) : (
        <p className='profile-name'>{userData.name}</p>
      )}

      <hr className='separator' />

      <div>
        <p className='contact-title'>CONTACT INFORMATION</p>
        <div className='contact-info'>
          <p className='label'>Email id:</p>
          <p className='email'>{userData.email}</p>
          <p className='label'>Phone:</p>

          {isEdit ? (
            <input className='edit-phone' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
          ) : (
            <p className='email'>{userData.phone}</p>
          )}

          <p className='label'>Address:</p>

          {isEdit ? (
            <p>
              <input className='edit-address' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
              <br />
              <input className='edit-address' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
            </p>
          ) : (
            <p className='address-text'>{userData.address.line1} <br /> {userData.address.line2}</p>
          )}

        </div>
      </div>
      <div>
        <p className='basic-info-title'>BASIC INFORMATION</p>
        <div className='basic-info'>
          <p className='label'>Gender:</p>

          {isEdit ? (
            <select className='edit-gender' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='basic-text'>{userData.gender}</p>
          )}

          <p className='label'>Birthday:</p>

          {isEdit ? (
            <input className='edit-birthday' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
          ) : (
            <p className='basic-text'>{userData.dob}</p>
          )}

        </div>
      </div>
      <div className='action-buttons'>

        {isEdit ? (
          <button className='save-button'>Save information</button>
        ) : (
          <button onClick={() => setIsEdit(true)} className='edit-button'>Edit</button>
        )}

      </div>
    </div>
  ) : null;
};

export default MyProfile;
