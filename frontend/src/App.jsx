import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import DiseaseToDoctor from './pages/DiseaseToDoctor';
import ChatPage from './pages/ChatPage';
import PortalPage from './pages/PortalPage';
import ReportPage from './pages/ReportPage';
import PatientHistoryPage from './pages/PatientHistoryPage';
import PatientDoctorPage from './pages/PatientDoctorPage';
import VirtualAssistantAI from './pages/VirtualAssistantAI';
import AIDiagnosis from "./pages/AIDiagnosis";

//hello
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
        <Route path="/disease-to-doctor" element={<DiseaseToDoctor />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/portal" element={<PortalPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/PatientHistoryPage" element={<PatientHistoryPage />} />
        <Route path="/patient/doctor/:appointmentId" element={<PatientDoctorPage />} />
        <Route path='/VirtualAssistantAI' element={<VirtualAssistantAI />} />
        <Route path="/ai-diagnosis" element={<AIDiagnosis />} />
        
        
      </Routes>
      <Footer />
    </div>
  )
}

export default App