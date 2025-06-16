import express from "express";
import {
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
} from "../controllers/userController.js";

import upload from "../middleware/multer.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
userRouter.post("/all-appointments", authUser, getAllAppointments);
userRouter.post("/all-chats", authUser, getAllChats);

// 💬 Chat Endpoints
userRouter.post("/chat/send", authUser, sendMessage);
userRouter.post("/chat/fetch", authUser, getChatByAppointment);

export default userRouter;
