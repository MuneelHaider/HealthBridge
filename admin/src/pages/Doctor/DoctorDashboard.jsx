import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import defaultpfp from '../../images/patientPFP.png';

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  const [selectedPanel, setSelectedPanel] = useState(null);

  // Hardcoded data for patients panel
  const hardcodedPatients = [
    { name: "John Doe", email: "john.doe@example.com", image: defaultpfp },
    { name: "Jane Smith", email: "jane.smith@example.com", image: defaultpfp },
    { name: "Michael Johnson", email: "michael.johnson@example.com", image: defaultpfp },
  ];

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData ? (
    <div className="flex m-5">
      {/* Main Content */}
      <div className="flex-1 max-w space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
        </div>

        {/* Stats Section */}
        <div className="flex justify-between gap-4">
          {[{
              icon: assets.earning_icon,
              label: "Earnings",
              value: `${currency} ${dashData.earnings}`,
              key: "earnings",
            },
            {
              icon: assets.appointments_icon,
              label: "Appointments",
              value: dashData.appointments,
              key: "appointments",
            },
            {
              icon: assets.patients_icon,
              label: "Patients",
              value: dashData.patients,
              key: "patients",
            },
          ].map((stat, index) => (
            <div
              key={index}
              onClick={() => setSelectedPanel(stat.key)}
              className="flex items-center gap-4 bg-white p-6 rounded shadow hover:scale-105 transition-all cursor-pointer pl-10 w-72"
            >
              <img className="w-14" src={stat.icon} alt="" />
              <div>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Latest Bookings Section */}
        <div className="bg-white rounded shadow">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-bold text-gray-800">Latest Bookings</h2>
            <button className="text-blue-500 hover:underline">View All Bookings</button>
          </div>
          <div className="divide-y">
            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center px-6 py-4 hover:bg-gray-100">
                <img className="w-12 h-12 rounded-full" src={item.userData.image || assets.default_user} alt="" />
                <div className="flex-1 ml-4">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-500 text-sm">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-500 font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 font-medium">Completed</p>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="text-red-500 hover:underline"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className="text-green-500 hover:underline"
                    >
                      Complete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      {selectedPanel && (
        <div className="bg-white shadow-md rounded-lg p-6 ml-5 w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 capitalize">
              {selectedPanel}
            </h2>
            <button
              onClick={() => setSelectedPanel(null)}
              className="text-red-500 hover:underline"
            >
              Close
            </button>
          </div>

          {selectedPanel === "earnings" && (
            <div className="space-y-4 w-200">
              <p className="text-gray-600 font-medium">Earnings Breakdown</p>
              {dashData.latestAppointments.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <p>{item.userData.name}</p>
                  <p>${item.fee || 200}</p>
                </div>
              ))}
              <div className="font-bold text-gray-800 mt-4">
                Total: ${dashData.earnings}
              </div>
            </div>
          )}

          {selectedPanel === "appointments" && (
            <div className="space-y-4">
              <p className="text-gray-600 font-medium">Appointment Details</p>
              {dashData.latestAppointments.map((item, index) => (
                <div key={index} className="flex flex-col border-b pb-2 mb-2">
                  <p className="font-bold">{item.userData.name}</p>
                  <p className="text-sm text-gray-600">Date: {slotDateFormat(item.slotDate)}</p>
                  <p className="text-sm text-gray-600">Mode: {item.isVirtual ? "Virtual" : "Physical"}</p>
                </div>
              ))}
            </div>
          )}

          {selectedPanel === "patients" && (
            <div className="space-y-4">
              <p className="text-gray-600 font-medium">Patient Profiles</p>
              {hardcodedPatients.map((patient, index) => (
                <div key={index} className="flex items-center gap-4 border-b pb-2">
                  <img src={patient.image || assets.default_user} className="w-10 h-10 rounded-full" alt="Patient" />
                  <div>
                    <p className="font-bold">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.email}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500 text-lg">Loading dashboard data...</p>
    </div>
  );
};

export default DoctorDashboard;
