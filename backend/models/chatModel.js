import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: String, // "patient" or "doctor"
  text: String,
  files: [
    {
      name: String,
      url: String,
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "appointments" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  docId: { type: mongoose.Schema.Types.ObjectId, ref: "doctors" },
  docData: Object,
  userData: Object,
  messages: [messageSchema],
});

export default mongoose.model("chats", chatSchema);
