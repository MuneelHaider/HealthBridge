import React from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  // Function to navigate to the portal page
  const navigateToPortal = (appointmentId) => {
    navigate(`/doctor/patient/${appointmentId}`);
  };

  return (
    <div className="w-full h-screen p-6">
      <p className="mb-6 text-2xl font-bold">All Appointments</p>

      <div className="bg-white border rounded text-base h-[85%] overflow-y-auto">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-6 py-5 px-8 border-b text-lg font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-6 items-center text-gray-700 py-5 px-8 border-b hover:bg-gray-50 text-lg cursor-pointer"
            onClick={() => navigateToPortal(item._id)} // Makes the entire row clickable
          >
            <p>{index + 1}</p>
            <div className="flex items-center gap-4">
              <img
                src={item.userData.image}
                className="w-14 h-14 rounded-full"
                alt=""
              />
              <p className="font-medium">{item.userData.name}</p>
            </div>
            <div>
              <p className="text-lg inline border border-[#08377b] px-4 py-1 rounded-full">
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>
            <div className="flex gap-4 items-center">
              {item.cancelled ? (
                <p className="text-red-500 font-medium">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-green-500 font-medium">Completed</p>
              ) : (
                <>
                  <img
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents row click event
                      cancelAppointment(item._id);
                    }}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="Cancel"
                  />
                  <img
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents row click event
                      completeAppointment(item._id);
                    }}
                    className="w-10 cursor-pointer"
                    src={assets.tick_icon}
                    alt="Complete"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
