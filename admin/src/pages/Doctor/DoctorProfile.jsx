import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }

      setIsEdit(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="m-5">
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col sm:flex-row gap-6">
          {/* Left Section: Image */}
          <div className="flex-shrink-0">
            <img
              className="w-48 h-48 rounded-lg object-cover border"
              src={profileData.image}
              alt="Doctor"
            />
          </div>

          {/* Right Section: Name and Details */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {profileData.name}
                </h1>
                <p className="text-gray-500">
                  {profileData.degree} - {profileData.speciality}{" "}
                  <span className="text-xs border px-2 py-0.5 rounded-full ml-2">
                    {profileData.experience} (s)
                  </span>
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-700">About:</h3>
                {isEdit ? (
                  <textarea
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                    className="w-full mt-1 p-2 border rounded"
                    rows={4}
                    value={profileData.about}
                  />
                ) : (
                  <p className="text-gray-600">{profileData.about}</p>
                )}
              </div>

              <div>
                <h3 className="font-bold text-gray-700">Appointment Fee:</h3>
                {isEdit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    className="w-full mt-1 p-2 border rounded"
                    value={profileData.fees}
                  />
                ) : (
                  <p className="text-gray-600">
                    {currency} {profileData.fees}
                  </p>
                )}
              </div>

              <div>
                <h3 className="font-bold text-gray-700">Address:</h3>
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      className="w-full mt-1 p-2 border rounded"
                      value={profileData.address.line1}
                    />
                    <input
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      className="w-full mt-1 p-2 border rounded"
                      value={profileData.address.line2}
                    />
                  </div>
                ) : (
                  <p className="text-gray-600">
                    {profileData.address.line1}
                    <br />
                    {profileData.address.line2}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  checked={profileData.available}
                  className="w-5 h-5"
                />
                <label className="text-gray-600">Available</label>
              </div>

              <div className="mt-4">
                {isEdit ? (
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEdit(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">
                Confirm Profile Changes
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to save the changes to your profile?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded shadow"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    updateProfile();
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded shadow"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default DoctorProfile;
