import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import bkgImg from "../../images/DoctorRegistration1.jpg";
import defaultpfp from "../../images/doctorDefaultPFP.svg";

const DoctorRegistration = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/register`,
        formData
      );

      if (data.success) {
        toast.success("Registration successful! Please log in.");
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
        setIsChecked(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left section with background image */}
      <div
        className="flex-1 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bkgImg})`,
        }}
      ></div>

      {/* Right section with form */}
      <div className="flex-1 flex items-center justify-center">
        <form
          onSubmit={onSubmitHandler}
          className="m-5 w-full max-w-2xl bg-white p-12 rounded shadow-md"
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Welcome to HealthBridge!
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Please register yourself as a Doctor here.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mb-10 text-gray-500">
            <label htmlFor="doc-img">
              <img
                className="w-20 h-20 bg-gray-100 rounded-full cursor-pointer"
                src={docImg ? URL.createObjectURL(docImg) : defaultpfp}
                alt="Doctor"
              />
            </label>
            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              id="doc-img"
              hidden
            />
            <p className="text-center">Upload your profile picture</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-4 py-3 w-full"
                type="text"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-4 py-3 w-full"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-4 py-3 w-full"
                type="password"
                placeholder="Set Password"
                required
              />
            </div>
            <div>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-4 py-3 w-full"
                required
              >
                <option value="" disabled>
                  Select Experience
                </option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3+ Years</option>
                <option value="5+ Years">5+ Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>
            <div>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-4 py-3 w-full"
                type="number"
                placeholder="Doctor Fees"
                required
              />
            </div>
            <div>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-4 py-3 w-full"
                type="text"
                placeholder="Degree"
                required
              />
            </div>
          </div>

          <div className="mt-8">
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              className="border rounded px-4 py-3 w-full"
              rows="4"
              placeholder="About yourself, your education and previous experience."
              required
            ></textarea>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-4 py-3 w-full"
                type="text"
                placeholder="Address Line 1"
                required
              />
            </div>
            <div>
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-4 py-3 w-full"
                type="text"
                placeholder="Address Line 2"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span className="text-sm text-gray-600">
                I understand that I am submitting my form to be reviewed for
                further clarification. Upon approval, I will be granted a
                registration with ID and password through my email and phone
                number.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isChecked}
            className={`mt-6 px-6 py-3 w-full text-white text-lg rounded ${
              isChecked
                ? "bg-blue-500 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistration;
