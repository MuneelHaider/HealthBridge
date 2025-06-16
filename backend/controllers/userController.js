import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from "cloudinary";
import chatModel from "../models/chatModel.js";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking for all data to register user
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // validating strong password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to update user profile
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not Available" });
    }

    let slots_booked = docData.slots_booked;

    // checking for slot availablity
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    // Create chat automatically when appointment is booked
    await chatModel.create({
      appointmentId: newAppointment._id,
      userId,
      docId,
      userData,
      docData,
      messages: [],
    });

    console.log("Chat Made");

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments for a patient
const getAllAppointments = async (req, res) => {
  try {
    const { userId } = req.body; // Assuming the frontend sends the patient's ID

    // Fetch all appointments where userId matches the patient ID
    const appointments = await appointmentModel.find({ userId });

    // Format response
    const formattedAppointments = appointments.map((appointment) => ({
      type: "appointment",
      doctorName: appointment.docData?.name || "Unknown Doctor",
      date: appointment.slotDate,
      time: appointment.slotTime,
      notes: appointment.notes || "No notes available",
      status: appointment.isCompleted ? "Completed" : "Pending",
    }));

    res.json({ success: true, appointments: formattedAppointments });
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch appointments" });
  }
};

const getAllChats = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "Missing userId in request body" });
    }

    const chats = await chatModel.find({ userId });

    res.json({ success: true, chats });
  } catch (error) {
    console.error("Error fetching patient chats:", error);
    res.status(500).json({ success: false, message: "Failed to fetch chats" });
  }
};



// Send a message
const sendMessage = async (req, res) => {
  try {
    const { appointmentId, sender, text, files } = req.body;

    if (!appointmentId || !sender || !text) {
      return res.json({ success: false, message: "Missing message data" });
    }

    const chat = await chatModel.findOne({ appointmentId });

    if (!chat) {
      return res.json({
        success: false,
        message: "Chat does not exist for this appointment.",
      });
    }

    // Push message
    chat.messages.push({
      sender,
      text,
      files: files || [],
      timestamp: new Date(),
    });

    await chat.save(); // MUST be a real Mongoose document!

    res.json({ success: true, chat });
  } catch (error) {
    console.error("Send Message Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send message." });
  }
};


// Fetch chat by appointment
const getChatByAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const chat = await chatModel.findOne({ appointmentId });

    if (!chat) {
      return res.json({ success: true, chat: { messages: [] } });
    }

    res.json({ success: true, chat });
  } catch (error) {
    console.error("Fetch Chat Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch chat." });
  }
};

export {
  loginUser,
  registerUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  getAllAppointments,
  getAllChats,
  sendMessage,
  getChatByAppointment,
};
